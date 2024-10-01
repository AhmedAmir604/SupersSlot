import Booking from "../schemas/bookingSchema.js";
import { bookingService } from "../services/bookingService.js";
import ErrorHandler from "../utils/appError.js";
import { catchAsync } from "./errorController.js";
import { deleteOne, getAll, getMy, updateOne } from "./factoryFunctions.js";
import moment from "moment-timezone";

export const createBooking = catchAsync(async (req, res, next) => {
  // const existingBooking = await bookingService.verifyBooking(req.body);
  // if (existingBooking) {
  //   return next(new ErrorHandler("This slot is already booked!", 400));
  // }
  req.body.user = req.user.id;
  const booking = await bookingService.createBooking(req.body);
  res.status(200).json({
    status: "success",
    booking,
  });
});

export const getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await bookingService.getMyBookings(req.user.id);
  const formattedBookings = bookingService.formatBookings(bookings);
  res.status(200).json({
    status: "success",
    length: bookings.length,
    bookings: formattedBookings,
  });
});

export const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await bookingService.getAllBookings();
  res.status(200).json({
    status: "success",
    results: bookings.length,
    bookings,
  });
});

// Update a booking
export const updateBooking = catchAsync(async (req, res, next) => {
  const updatedBooking = await bookingService.updateBooking(
    req.params.id,
    req.body
  );
  if (!updatedBooking) {
    return next(new ErrorHandler("Booking not found!", 404));
  }
  res.status(200).json({
    status: "success",
    booking: updatedBooking,
  });
});

// Delete a booking
export const deleteBooking = catchAsync(async (req, res, next) => {
  const deletedBooking = await bookingService.deleteBooking(req.params.id);
  if (!deletedBooking) {
    return next(new ErrorHandler("Booking not found!", 404));
  }
  res.status(204).json({
    status: "success",
    message: "Booking deleted successfully",
  });
});
