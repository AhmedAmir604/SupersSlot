import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  addUserServiceId,
  createReview,
  deleteReview,
  getMyReviews,
  getAllReviews,
  getReview,
  updateReview,
} from "../controllers/reviewsController.js";

const reviewsRoute = express.Router({ mergeParams: true });

reviewsRoute.route("/").get(getAllReviews);

reviewsRoute.use(protect);
reviewsRoute.route("/my-reviews").get(getMyReviews);

reviewsRoute.route("/").post(addUserServiceId, createReview);

reviewsRoute.route("/:id").get(getReview);
reviewsRoute.use(restrictTo("admin", "user"));
reviewsRoute.route("/:id").patch(updateReview).delete(deleteReview);

export default reviewsRoute;
