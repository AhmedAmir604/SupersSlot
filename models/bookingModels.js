import Booking, { bookingSchema } from "../schemas/bookingSchema.js";

// Ensure combination of service provider and time slot is unique
// bookingSchema.index({ serviceProvider: 1, startTime: 1 }, { unique: true });

bookingSchema.pre("save", async function (next) {
  this.startTime = new Date(this.startTime).toISOString();
  this.endTime = new Date(this.endTime).toISOString();
  next();
});

bookingSchema.pre(/^find/, async function (next) {
  this.populate(["service", "user"]);
  next();
});

class BookingModel {
  async verifyBooking(body) {
    const { startTime, endTime, service } = body;
    return await Booking.findOne({
      service,
      startTime: { $lte: endTime }, // Existing booking starts before the new booking ends
      endTime: { $gte: startTime }, // Existing booking ends after the new booking starts
      status: { $nin: ["cancelled", "completed"] },
    });
  }

  async createBooking(object) {
    return await Booking.create(object);
  }
}

export const bookingModel = new BookingModel();
