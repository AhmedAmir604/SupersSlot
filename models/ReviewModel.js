import reviewsSchema from "../schemas/reviewsSchema.js";
import Model from "./Models.js";
import mongoose from "mongoose";
import ErrorHandler from "../utils/appError.js";
import servicesService from "../services/ServicesService.js";

reviewsSchema.post("save", async function (doc) {
  const reviews = await Review.find({ service: this.service }).select("rating");
  const newRatingsAvg = parseFloat(
    reviews.reduce((acc, obj) => acc + obj.rating, 0) / reviews.length,
    1
  );
  await servicesService.updateOne(this.service, {
    $set: { ratingsAverage: newRatingsAvg }, // Update ratingsAverage
    $inc: { ratingsQuantity: 1 }, // Increment ratingsQuantity by 1
  });
});

reviewsSchema.pre("save", async function (next) {
  if (!this.isNew) next();
  if (await Review.find({ user: this.user, service: this.service })) {
    next(new ErrorHandler("Your Review for this Service already exist!", 400));
  } else {
    next();
  }
});

const Review = mongoose.model("Review", reviewsSchema);
const reviewModel = new Model(Review);

export default reviewModel;
