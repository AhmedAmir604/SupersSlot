import Booking from "../schemas/bookingSchema.js";
import { bookingService } from "../services/bookingService.js";
import ErrorHandler from "../utils/appError.js";
import { catchAsync } from "./errorController.js";
import { deleteOne, getAll, getMy, updateOne } from "./factoryFunctions.js";

export const createBooking = catchAsync(async (req, res, next) => {
  const existingBooking = await bookingService.verifyBooking(req.body);
  if (existingBooking) {
    return next(new ErrorHandler("This slot is already booked!", 400));
  }
  req.body.user = req.user.id;
  const booking = await bookingService.createBooking(req.body);
  res.status(200).json({
    status: "success",
    booking,
  });
});

export const getMyBookings = getMy(Booking);

export const getAllBookings = getAll(Booking);

export const updateBooking = updateOne(Booking);

export const deleteBooking = deleteOne(Booking);
