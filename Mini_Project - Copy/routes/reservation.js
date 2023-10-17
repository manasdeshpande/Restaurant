import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js' 
import { checkAvailableTables, deleteReservation, getReservations, reservationController, userReservations } from '../controller/reservationController.js';

const router = express.Router()

router.post('/', requireSignIn, reservationController);

router.get('/view-reservations',  getReservations)

router.put('/user-reservations',  userReservations)

router.delete('/delete-reservation/:id', deleteReservation)

router.get('/tables', checkAvailableTables);

export default router;