import { User, Table, Reservation } from "../models/userModel.js";

const findNextAvailableTable = async (tableNumber, capacity, date, time) => {
  let nextTableNumber = tableNumber + 1;

  while (true) {
    const nextAvailableTable = await Table.findOne({
      tableNumber: nextTableNumber,
      capacity,
    });

    if (!nextAvailableTable) {
      return null; // No available tables
    }

    const [hour, minute, seconds] = time.split(":").map(Number);
    const oneHourMore = hour + 1;
    const oneHourMoreTime = `${oneHourMore}:${minute}:${seconds}`;
    const oneHourLess = hour - 1;
    const oneHourLessTime = `${oneHourLess}:${minute}:${seconds}`;
    const isTableReserved = await Reservation.findOne({
      "table.tableNumber": nextTableNumber,
      date,
      $and: [
        { time: { $gte: `${oneHourLessTime}` } },
        { time: { $lte: `${oneHourMoreTime}` } },
      ],
    });
    console.log("isTableReserved:", isTableReserved);
    if (!isTableReserved) {
      return nextAvailableTable;
    }

    nextTableNumber++;
  }
};

export const reservationController = async (req, res) => {
  try {
    const { userId, userEmail, userFirstname , date, time, table } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const [hour, minute, seconds] = time.split(":").map(Number);
    const oneHourMore = hour + 1;
    const oneHourMoreTime = `${oneHourMore}:${minute}:${seconds}`;
    const oneHourLess = hour - 1;
    const oneHourLessTime = `${oneHourLess}:${minute}:${seconds}`;

    const existingReservation = await Reservation.findOne({
      "table.tableId": table,
      date,
      $and: [
        { time: { $gte: `${oneHourLessTime}` } },
        { time: { $lte: `${oneHourMoreTime}` } },
      ],
    });

    if (existingReservation) {
      const existingTable = await Table.findById(table);
      const nextAvailableTable = await findNextAvailableTable(
        existingTable.tableNumber,
        existingTable.capacity,
        date,
        time
      );

      if (!nextAvailableTable) {
        return res.status(400).send({
          success: false,
          message: "No available tables for the specified date and time",
        });
      }

      const reservation = new Reservation({
        user: { userFirstname, userEmail },
        table: {
          tableId: nextAvailableTable._id,
          tableNumber: nextAvailableTable.tableNumber,
        },
        date,
        time,
      });
      console.log("email:", userEmail);
      await reservation.save();

      user.reservations.push(reservation);
      await user.save();

      return res.status(200).send({
        success: true,
        message: "Reservation added successfully",
        reservation,
      });
    } else {
      console.log('first name' , userFirstname)
      console.log('user email' , userEmail)
      const { _id, tableNumber } = await Table.findById(table);
      const reservation = new Reservation({
        user: { userFirstname, userEmail},
        table: {
          tableId: _id,
          tableNumber: tableNumber,
        },
        date,
        time,
      });
      await reservation.save();

      user.reservations.push(reservation);
      await user.save();

      return res.status(200).send({
        success: true,
        message: "Reservation added successfully",
        reservation,
      });
    }
  } catch (error) {
    console.error("Error in reservation:", error);
    res.status(500).send({
      success: false,
      message: "Error in reservation",
      error,
    });
  }
};

export const updateReservation = async () => {
  try {
    const reservations = await Reservation.find({
      createdAt: { $lte: new Date(Date.now() - 30 * 60 * 1000) }, //
    });

    for (const reservation of reservations) {
      await Reservation.findByIdAndDelete(reservation._id);
    }
  } catch (error) {
    console.error("Error updating reservations:", error);
  }
};

export const checkAvailableTables = async (req, res) => {
  try {
    const { capacity } = req.query;

    if (!capacity) {
      return res
        .status(400)
        .json({ success: false, message: "Capacity parameter is required." });
    }

    const availableTables = await Table.find({ capacity });

    return res.status(200).send({ success: true, tables: availableTables });
  } catch (error) {
    console.error("Error fetching available tables:", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};

export const getReservations = async (req, res) => {
  try {
    const currentDate = new Date();

    const reservation = await Reservation
      .find({})  // Filter for upcoming reservations
      .limit(16)
      .sort({ date: 1 });  // Sort by date in ascending order

      const reservations = reservation.filter(reservation => new Date(reservation.date) >= currentDate);  // Filter for upcoming reservations
    res.status(200).send({
      success: true,
      totalReservations: reservations.length,
      reservations,
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}

export const userReservations = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    const currentDate = new Date();

    const reservations = user.reservations.filter(
      (reservation) => new Date(reservation.date) >= currentDate
    );

    res.status(200).send({
      success: true,
      totalReservations: reservations.length,
      reservations,
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

// Define the deleteReservation function
export const deleteReservation = async (req, res) => {
  const reservationId = req.params.id;

  try {
    // Find the reservation by its ID and remove it
    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);

    if (!deletedReservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }


    // Find the user associated with this reservation
    const user = await User.findOne({ 'reservations._id': reservationId });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found for the reservation' });
    }

    // Remove the reservation object with the matching _id from the user's reservations array
    user.reservations = user.reservations.filter(reservation => reservation._id.toString() !== reservationId);

    // Save the updated user
    await user.save();


    return res.status(200).json({ success: true, message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

