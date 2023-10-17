"use client"

import React, { useEffect, useState } from 'react'
import ReservationTable from './ReservationTable';

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
      // Fetch reservations from the API
      const fetchReservations = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/v1/reservation/view-reservations');
          if (!response.ok) {
            throw new Error('Failed to fetch reservations');
          }
          const data = await response.json();
          setReservations(data.reservations);
        } catch (error) {
          console.error('Error fetching reservations:', error);
        }
      };
  
      fetchReservations();
    }, []);

    const handleDeleteReservation = async (reservationId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/reservation/delete-reservation/${reservationId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to delete reservation');
        }
    
        setReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation._id !== reservationId)
        );
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    };
  return (
    <div className="flex flex-col mx-20 items-center justify-center min-h-screen">
    <h1 className="text-2xl lg:text-4xl text-white font-navlinks font-bold mb-4">Upcoming Reservations</h1>
    <ReservationTable reservations={reservations} onDeleteReservation={handleDeleteReservation}/>
  </div>
  )
}

export default Dashboard