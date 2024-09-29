import Booking from "../models/bookingModel.js";
import ErrorHandler from "../utils/appError.js";
import { catchAsync } from "./errorController.js";
import { getAll } from "./factoryFunctions.js";

export const createBooking = catchAsync(async (req, res, next) => {
  const { startTime, endTime, serviceProvider } = req.body;
  const existingBooking = await Booking.findOne({
    serviceProvider,
    startTime: { $lt: startTime },
    endTime: { $gt: endTime },
    status: { $nin: ["cancelled", "completed"] },
  });
  if (existingBooking) {
    return next(new ErrorHandler("This slot is already booked!", 400));
  }
  req.body.customer = req.user.id;
  const booking = await Booking.create(req.body);

  res.status(200).json({
    status: "success",
    booking,
  });
});

export const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ customer: req.user.id });
  res.status(200).json({
    status: "success",
    bookings,
  });
});
