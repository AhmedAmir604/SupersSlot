import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  serviceProvider: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Service provider (e.g., barber)
    required: [true, "A booking must have a service provider"],
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Customer booking the service
    required: [true, "A booking must have a customer"],
  },
  startTime: {
    type: Date,
    required: [true, "A booking must have a start time"],
  },
  endTime: {
    type: Date,
    required: [true, "A booking must have an end time"],
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure combination of service provider and time slot is unique
// bookingSchema.index({ serviceProvider: 1, startTime: 1 }, { unique: true });

bookingSchema.pre("save", async function (next) {
  this.startTime = new Date(this.startTime).toISOString();
  this.endTime = new Date(this.endTime).toISOString();
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
