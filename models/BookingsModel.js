import Model from "./Models.js";
import bookingSchema from "../schemas/bookingSchema.js";
import mongoose from "mongoose";
import serviceModel from "./ServicesModel.js";

bookingSchema.pre("save", async function (next) {
  this.startTime = new Date(this.startTime).toISOString();
  this.endTime = new Date(this.endTime).toISOString();
  next();
});

bookingSchema.pre("save", async function (next) {
  this.price = (await serviceModel.findById(this.service, "price")).price;
  next();
});

bookingSchema.post("save", async function (doc) {
  await doc.populate([
    { path: "user", select: "name email photo" },
    { path: "service", select: "name serviceType price" },
  ]);
});

class BookingModel extends Model {
  constructor(mongooseModel) {
    super(mongooseModel);
  }

  async verifyBooking(body) {
    const { startTime, endTime, service } = body;
    return await super.find({
      service,
      $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
      status: { $nin: ["cancelled", "completed"] },
    });
  }

  async findBookings(filter) {
    const bookings = await this.mongooseModel
      .find(filter)
      .select("startTime endTime price status") // Selecting specific fields from the booking
      .populate({
        path: "user", // Assuming 'user' is the field to populate
        select: "name email photo", // Selecting specific fields from the user
      })
      .populate({
        path: "service", // Assuming 'service' is the field to populate
        select: "name serviceType price", // Selecting specific fields from the service
      });

    return bookings;
  }

  // async unavailableBookings(service) {
  //   const startOfDay = new Date();
  //   startOfDay.setHours(0, 0, 0, 0);
  //   const endOfDay = new Date();
  //   endOfDay.setHours(23, 59, 59, 999);
  //   return await this.mongooseModel.find({
  //     service,
  //     startTime: {
  //       $gte: startOfDay,
  //       $lte: endOfDay,
  //     },
  //   });
  // }
}

const Booking = mongoose.model("Booking", bookingSchema);

const bookingModel = new BookingModel(Booking);

export default bookingModel;
