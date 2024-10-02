import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Please enter the review "],
    },
    rating: {
      type: Number,
      required: [true, "rating is required to continue"],
      min: [1, "Review must be between 1 and 5"],
      max: [5, "Review must be between 1 and 5"],
      default: 4,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A review must belong to a user!"],
    },

    service: {
      type: mongoose.Schema.ObjectId,
      ref: "Service",
      required: [true, "A review must belong to a Service!"],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

export default reviewsSchema;
