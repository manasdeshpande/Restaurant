import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import authorizations from './routes/authorization.js';
import reservations from './routes/reservation.js';
import morgan from "morgan";
import { Table } from "./models/userModel.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use('/api/v1/authorization' , authorizations)
app.use('/api/v1/reservation' , reservations)

app.get("/", (req, res) => {
  res.send("<h1>Restaurant Booking Website</h1><h2>WD Mini_Project<h2/><h2>Parth Kadam D11AD 27</h2>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
