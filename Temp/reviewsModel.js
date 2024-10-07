import reviewsSchema from "../schemas/reviewsSchema.js";
import mongoose from "mongoose";
import serviceModel from "../models/serviceModel.js";
import servicesService from "./serviceService.js";

//For allowing user to give on review each service :)
// reviewsSchema.index({ user: 1, service: 1 }, { unique: true });

// reviewsSchema.pre(/^find/, function (next) {
//   this.populate(["user", "service"]);
//   next();
// });

reviewsSchema.post("save", async function (doc) {
  const reviews = await Review.find({ service: this.service }).select("rating");
  const newRatingsAvg = parseFloat(
    reviews.reduce((acc, obj) => acc + obj.rating, 0) / reviews.length,
    1
  );
  await servicesService.updateService(this.service, {
    $set: { ratingsAverage: newRatingsAvg }, // Update ratingsAverage
    $inc: { ratingsQuantity: 1 }, // Increment ratingsQuantity by 1
  });
});

// reviewsSchema.pre("save", async function(next){
//   const service = await serviceModel.getOne(this.service, "ratingsAverage ratingsQauntity");
// })

const Review = mongoose.model("Review", reviewsSchema);

class ReviewModel {
  async getAll() {
    return await Review.find();
  }

  async getMyReviews(userId) {
    return await Review.find({ user: userId });
  }

  async getOne(id) {
    return await Review.findById(id);
  }

  async createOne(data) {
    return await Review.create(data);
  }

  async verifyReview(data) {
    const review = await Review.find({
      user: data.user,
      service: data.service,
    });
    return review;
  }

  async updateOne(id, data) {
    return await Review.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteOne(id) {
    return await Review.findByIdAndDelete(id);
  }
}

export const reviewModel = new ReviewModel();
