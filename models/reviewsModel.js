import reviewsSchema from "../schemas/reviewsSchema.js";
import mongoose from "mongoose";

//For allowing user to give on review each service :)
// reviewsSchema.index({ user: 1, service: 1 }, { unique: true });

reviewsSchema.pre(/^find/, function (next) {
  this.populate(["user", "service"]);
  next();
});

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

const Review = mongoose.model("Review", reviewsSchema);

export const reviewModel = new ReviewModel();
