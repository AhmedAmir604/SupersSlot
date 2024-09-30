import { reviewModel } from "../models/reviewsModel.js";

class ReviewService {
  constructor(Model) {
    this.reviewModel = Model;
  }

  async verifyReview(data) {
    return await this.reviewModel.verifyReview(data);
  }

  async createReview(data) {
    return await this.reviewModel.createOne(data);
  }

  async getAllReviews() {
    return await this.reviewModel.getAll();
  }

  async getMyReviews(userId) {
    return await this.reviewModel.getMyReviews(userId);
  }

  async getReview(id) {
    return await this.reviewModel.getOne(id);
  }

  async updateReview(id, data) {
    return await this.reviewModel.updateOne(id, data);
  }

  async deleteReview(id) {
    return await this.reviewModel.deleteOne(id);
  }
}

const reviewService = new ReviewService(reviewModel);

export default reviewService;
