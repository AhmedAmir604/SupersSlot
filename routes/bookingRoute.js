import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getMyBookings,
  unavailableBookings,
  updateBooking,
} from "../controllers/bookingController.js";
import { protect, restrictTo } from "../controllers/authController.js";
import { getServicesForBooking } from "../controllers/serviceController.js";

const bookingRoute = express.Router();

bookingRoute.use(protect);
bookingRoute.route("/").post(createBooking);
bookingRoute.route("/unavailable-bookings/:id").get(unavailableBookings);
bookingRoute.route("/my-bookings").get(getMyBookings).patch(updateBooking);
bookingRoute.route("/:id").get(getServicesForBooking);

bookingRoute.use(restrictTo("admin", "service-provider"));
bookingRoute.route("/").get(getAllBookings);
bookingRoute.route("/:id").delete(deleteBooking).patch(updateBooking);

export default bookingRoute;
