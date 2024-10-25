import bookingService from "../services/BookingsService.js";
import ErrorHandler from "../utils/appError.js";
import { catchAsync } from "./errorController.js";
import { deleteOne, getAll, getMy, updateOne } from "./factoryFunctions.js";
import moment from "moment-timezone";

export const createBooking = catchAsync(async (req, res, next) => {
  if (await bookingService.verifyBooking(req.body)) {
    return next(new ErrorHandler("This slot is already booked!", 400));
  }
  req.body.user = req.user.id;
  const booking = await bookingService.create(req.body);
  res.status(200).json({
    status: "success",
    booking,
  });
});

export const getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await bookingService.getMy({ user: req.user.id });
  // const formattedBookings = bookingService.formatBookings(bookings);
  res.status(200).json({
    status: "success",
    length: bookings.length,
    bookings,
  });
});

export const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await bookingService.getAll(req);
  res.status(200).json({
    status: "success",
    results: bookings.length,
    bookings,
  });
});

// Update a booking
export const updateBooking = catchAsync(async (req, res, next) => {
  if (await bookingService.verifyBooking(req.body)) {
    return next(new ErrorHandler("This slot is already booked!", 400));
  }
  const updatedBooking = await bookingService.updateOne(
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

export const unavailableBookings = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { date } = req.query;
  const bookings = await bookingService.unavailableBookings(id, date);
  res.status(200).json({
    status: "success",
    count: bookings.length,
    bookings,
  });
});

// Delete a booking
export const deleteBooking = catchAsync(async (req, res, next) => {
  const deletedBooking = await bookingService.deleteOne(req.params.id);
  if (!deletedBooking) {
    return next(new ErrorHandler("Booking not found!", 404));
  }
  res.status(204).json({
    status: "success",
    message: "Booking deleted successfully",
  });
});
