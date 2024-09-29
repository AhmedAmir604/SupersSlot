import express from "express";
import {
  createBooking,
  getAllBookings,
} from "../controllers/bookingController.js";
import { protect } from "../controllers/authController.js";

const bookingRoute = express.Router();

bookingRoute.use(protect);
bookingRoute.route("/my-bookings").post(createBooking).get(getAllBookings);

export default bookingRoute;
