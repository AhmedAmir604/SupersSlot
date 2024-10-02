import Model from "./Models.js";
import bookingSchema from "../schemas/bookingSchema.js";
import mongoose from "mongoose";

bookingSchema.pre("save", async function (next) {
  this.startTime = new Date(this.startTime).toISOString();
  this.endTime = new Date(this.endTime).toISOString();
  next();
});

bookingSchema.pre("save", async function (next) {
  this.price = (await serviceModel.getOne(this.service, "price")).price;
  next();
});

class BookingModel extends Model {
  constructor(mongooseModel) {
    super(mongooseModel);
  }

  async verifyBooking(body) {
    const { startTime, endTime, service } = body;
    return await this.Model.findOne({
      service,
      startTime: { $lte: endTime }, // Existing booking starts before the new booking ends
      endTime: { $gte: startTime }, // Existing booking ends after the new booking starts
      status: { $nin: ["cancelled", "completed"] },
    });
  }
}

const Booking = mongoose.model("Booking", bookingSchema);

const bookingModel = new BookingModel(Booking);

export default bookingModel;
