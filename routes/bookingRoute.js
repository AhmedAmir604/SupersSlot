import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getMyBookings,
  updateBooking,
} from "../controllers/bookingController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const bookingRoute = express.Router();

bookingRoute.use(protect);
bookingRoute.route("/").post(createBooking);
bookingRoute.route("/my-bookings").get(getMyBookings);

bookingRoute.use(restrictTo("admin", "service-provider"));
bookingRoute.route("/").get(getAllBookings);
bookingRoute.route("/:id").delete(deleteBooking).patch(updateBooking);

export default bookingRoute;
