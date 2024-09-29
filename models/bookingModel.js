import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: [true, "A service must have a name"],
      trim: true,
      enum: {
        values: ["barber", "salon", "massage", "spa"],
        message: "Service must be either barber, salon, massage, or spa",
      },
    },
    serviceProvider: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // Assuming you have a User model for service providers
      required: [true, "An appointment must have a service provider"],
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // Assuming you have a User model for customers
      required: [true, "An appointment must have a customer"],
    },
    date: {
      type: Date,
      required: [true, "An appointment must have a date"],
    },
    startTime: {
      type: String, // Could be stored as a string in "HH:MM" format
      required: [true, "An appointment must have a start time"],
    },
    endTime: {
      type: String,
      required: [true, "An appointment must have an end time"],
    },
    price: {
      type: Number,
      required: [true, "A service must have a price"],
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
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate for referencing service history, if needed
// appointmentSchema.virtual("serviceHistory", {
//   ref: "ServiceHistory",
//   foreignField: "appointment",
//   localField: "_id",
// });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
