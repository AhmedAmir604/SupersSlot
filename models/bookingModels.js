import mongoose from "mongoose";
import bookingSchema from "../schemas/bookingSchema.js";
import moment from "moment-timezone";
import serviceModel from "./serviceModel.js";
import ErrorHandler from "../utils/appError.js";

// Ensure combination of service provider and time slot is unique
// bookingSchema.index({ serviceProvider: 1, startTime: 1 }, { unique: true });

bookingSchema.pre("save", async function (next) {
  this.startTime = new Date(this.startTime).toISOString();
  this.endTime = new Date(this.endTime).toISOString();
  next();
});

bookingSchema.pre("save", async function (next) {
  this.price = (await serviceModel.getOne(this.service, "price")).price;
  next();
});

// bookingSchema.pre(/^find/, async function (next) {
//   this.populate(["service", "user"]);
//   next();
// });
class BookingModel {
  constructor(Model) {
    this.Model = Model;
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

  async unConfirmedBookings(filter, operation) {
    return await this.Model.updateMany(filter, operation);
  }

  async createBooking(object) {
    return await this.Model.create(object);
  }

  async getMyBookings(user) {
    return await this.Model.find({ user: user });
  }

  async getAll() {
    return await this.Model.find();
  }

  async updateOne(id, data) {
    return await this.Model.findByIdAndUpdate(id, data, { new: true });
  }

  async updateMany(docs) {
    return await this.Model.updateMany(docs);
  }

  async deleteOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    return await this.Model.findByIdAndDelete(id);
  }
}

export const Booking = mongoose.model("Booking", bookingSchema);

export const bookingModel = new BookingModel(Booking);
