"use client";

import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateCalendar } from "@mui/x-date-pickers";
import { Snackbar, SnackbarContent } from "@mui/material";
import { useRouter } from "next/navigation";

const options = [2, 4, 5, 8, 12];
const today = dayjs();

function ResponsiveTimePicker({ onTimeChange }) {
  const sixHoursFromNow = today.add(6, "hours");

  const maxTime = today
    .add(6, "hours")
    .set("minute", 0)
    .set("second", 0)
    .set("hour", 12);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={sixHoursFromNow}
        onChange={onTimeChange}
        minTime={dayjs().hour(8).minute(0)}
        maxTime={dayjs().hour(23).minute(59)}
        required
      />
    </LocalizationProvider>
  );
}

const ReservationForm = () => {
  const [errors, setErrors] = useState({});
  const [auth, setAuth] = useAuth();
  const [people, setPeople] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorToastOpen, setErrorToastOpen] = useState(false);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();
  const handleOpenErrorToast = (message) => {
    setToastMessage(message);
    setErrorToastOpen(true);
  };

  const handleOpenSuccessToast = (message) => {
    setToastMessage(message);
    setSuccessToastOpen(true);
  };

  const handleCloseErrorToast = () => {
    setErrorToastOpen(false);
  };

  const handleCloseSuccessToast = () => {
    setSuccessToastOpen(false);
  };

  const maxDate = today.add(30, "day");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const errors = {};
      const selectedDateTime = dayjs(selectedDate)
        .hour(selectedTime.hour())
        .minute(selectedTime.minute());

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      const response = await axios.get(
        "http://localhost:8080/api/v1/reservation/tables",
        {
          params: {
            capacity: people,
          },
        }
      );

      if (response.data.success && response.data.tables.length > 0) {
        const tableId = response.data.tables[0]._id;
        const tableNumber = response.data.tables[0].tableNumber;

        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const formattedTime = selectedTime.format("HH:mm:ss");
        console.log(auth.user.firstname);
        const reservationData = {
          userId: auth.user.id,
          userFirstname: auth.user.firstname,
          userEmail: auth.user.email,
          table: tableId,
          tableNumber: tableNumber,
          date: formattedDate,
          time: formattedTime,
          people: parseInt(people),
        };
        const reservationResponse = await axios.post(
          "http://localhost:8080/api/v1/reservation",
          reservationData
        );

        console.log("Reservation details:", reservationResponse.data);
        handleOpenSuccessToast("Reservation added successfully");
        router.push("/profile");
      } else {
        console.error("No available tables for the specified capacity.");
        handleOpenErrorToast("No available tables for the specified capacity.");
      }
    } catch (error) {
      console.error("Error during reservation:", error);
      handleOpenErrorToast("No available tables for the specified capacity.");
    }
  };

  if (auth.user === null) {
    return (
      <>
        <div className="flex mt-10 min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-16 xl:mt-[-0.5rem]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-4xl lg:text-5xl font-thin text-center font-title text-white select-none">
              Elysium
            </h1>
            <h2 className="mt-3 text-center text-2xl lg:text-4xl font-medium leading-9 tracking-tight text-white font-navlinks">
              Sign In to Reserve a Table
            </h2>
          </div>
          <Link href="/profile/login" passHref>
            <button className="flex justify-center w-[7em] rounded-lg bg-white px-3 py-2 mt-10 text-lg font-medium leading-6 text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              Sign In
            </button>
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex min-h-screen mt-5 flex-1 flex-col justify-center py-12 lg:px-[8rem] xl:mt-[-0.5rem]">
          <div className="bg-white py-3 rounded-3xl">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl lg:text-4xl font-medium leading-9 tracking-tight text-black font-navlinks">
                Reserve Table
              </h2>
            </div>

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                  <div className="flex">
                    <div className="flex-1">
                      <select
                        id="people"
                        name="people"
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                        required
                        className="block w-full rounded-md border py-2 px-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-gray-600 sm:text-sm sm:leading-6"
                      >
                        <option value="" disabled>
                          Number of people
                        </option>
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option} people
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1">
                      <ResponsiveTimePicker onTimeChange={handleTimeChange} />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                          minDate={today}
                          maxDate={maxDate}
                          date={selectedDate}
                          onChange={handleDateChange}
                          required
                          className="w-[25rem] lg:w-[15rem]"
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="py-2 px-6 rounded-lg  text-black  focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                  >
                    Reserve
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={errorToastOpen}
          autoHideDuration={6000}
          onClose={handleCloseErrorToast}
        >
          <SnackbarContent
            style={{ backgroundColor: "#f44336" }}
            message={toastMessage}
          />
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={successToastOpen}
          autoHideDuration={6000}
          onClose={handleCloseSuccessToast}
        >
          <SnackbarContent
            style={{ backgroundColor: "#4caf50" }}
            message={toastMessage}
          />
        </Snackbar>
      </>
    );
  }
};

export default ReservationForm;
