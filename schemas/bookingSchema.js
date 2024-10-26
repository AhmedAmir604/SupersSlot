import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.ObjectId,
    ref: "Service", // Service provider (e.g., barber)
    required: [true, "A booking must have a service!"],
  },
  categories: {
    type: String,
    required: [true, "Must have a serviceType"],
  },
  bookingFor: {
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      validate: {
        validator: (val) => {
          // If email is provided, check its format, otherwise allow it to be empty
          return (
            !val || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)
          );
        },
        message: "Please enter a valid email",
      },
    },
    phone: {
      type: Number,
      maxLength: [15, "Max Length is 15 for Phone"],
    },
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Customer booking the service
    required: [true, "A booking must have a User"],
  },
  startTime: {
    type: Date,
    required: [true, "A booking must have a start time"],
  },
  endTime: {
    type: Date,
    required: [true, "A booking must have an end time"],
    validate: {
      validator: function (endTime) {
        return this.startTime < endTime;
      },
      message: "Start Time cannot be less then End Time!",
    },
  },
  price: {
    type: Number,
    required: [true, "A Booking must have a price!"],
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

export default bookingSchema;
