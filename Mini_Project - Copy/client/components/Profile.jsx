"use client"

import React, { useEffect, useState } from 'react';
import ReservationTable from './ReservationTable';

const Profile = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmail = JSON.parse(localStorage.getItem('auth')).user.email;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/reservation/user-reservations', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),  // Replace with the actual user's email
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }

        const data = await response.json();
        setReservations(data.reservations);
        setLoading(false);
      } catch (error) {
        setError('Error fetching reservations');
        console.error('Error fetching reservations:', error);
        setLoading(false);
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
  
      // Assuming successful deletion, update your reservations in the UI
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
      {loading && <p>Loading reservations...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <ReservationTable reservations={reservations} onDeleteReservation={handleDeleteReservation}/>}
    </div>
  );
};

export default Profile;
