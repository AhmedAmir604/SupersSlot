import Model from "./Models.js";
import bookingSchema from "../schemas/bookingSchema.js";
import mongoose from "mongoose";
import serviceModel from "./ServicesModel.js";

bookingSchema.pre("save", async function (next) {
  this.startTime = new Date(this.startTime);
  this.endTime = new Date(this.endTime);
  const currentTime = new Date();

  if (this.startTime < currentTime) {
    return next(new Error("Cannot make bookings for past!")); // Properly pass the error to next
  }
  //After checking the current status parsing the times into iso
  this.startTime = this.startTime.toISOString();
  this.endTime = this.endTime.toISOString();
  next(); // Call next if the time is valid
});

bookingSchema.pre("save", async function (next) {
  next();
});

bookingSchema.pre("save", async function (next) {
  const doc = await serviceModel.find({ _id: this.service }, "categories");
  if (doc[0].categories.includes(this.categories)) {
    next();
  }
  throw new Error("Such service is not offered by the Shop");
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
bookingSchema.post("find", function (docs) {
  docs.forEach((doc) => {
    const startTime = new Date(doc.startTime);
    const endTime = new Date(doc.endTime);

    const options = {
      weekday: "short", // 'Tue'
      hour: "numeric", // '1'
      minute: "numeric", // Add minute formatting if needed
      hour12: true, // Convert 24-hour time to 12-hour time
    };

    // Format start and end times
    const formattedStart = startTime.toLocaleString("en-US", options);
    const formattedEnd = endTime.toLocaleString("en-US", options);

    // Add formatted times to the document object
    doc._doc.formattedStart = formattedStart;
    doc._doc.formattedEnd = formattedEnd;
  });
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
}

const Booking = mongoose.model("Booking", bookingSchema);

const bookingModel = new BookingModel(Booking);

export default bookingModel;
