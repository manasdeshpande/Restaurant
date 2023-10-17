import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const ReservationTable = ({ reservations, onDeleteReservation }) => {
    const [updatedReservations, setUpdatedReservations] = useState(reservations);

    useEffect(() => {
      setUpdatedReservations(reservations);
    }, [reservations]);

    const handleDeleteReservation = (reservationId) => {
      // Call the onDeleteReservation function with the reservation ID
      onDeleteReservation(reservationId);
    };
  return (
    <TableContainer component={Paper} className="m-16 mt-8 p-2 rounded-3xl bg-white">
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Table Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {updatedReservations.map((reservation) => (
            <TableRow key={reservation._id}>
              <TableCell>{reservation.user.userEmail}</TableCell>
              <TableCell>{reservation.user.userFirstname}</TableCell>
              <TableCell>{reservation.date}</TableCell>
              <TableCell>{reservation.time.split(':').slice(0, 2).join(':')}</TableCell>
              <TableCell>{reservation.table.tableNumber}</TableCell>
              
              <TableCell>
                <Button onClick={() => handleDeleteReservation(reservation._id)} color="secondary">
                  Delete
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReservationTable;
