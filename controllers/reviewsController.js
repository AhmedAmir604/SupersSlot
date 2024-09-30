import Review from "../schemas/reviewsSchema.js";
import reviewService from "../services/reviewServices.js";
import ErrorHandler from "../utils/appError.js";
import { catchAsync } from "./errorController.js";
import {
  createOne,
  deleteOne,
  getAll,
  getMy,
  getOne,
  updateOne,
} from "./factoryFunctions.js";

export const addUserServiceId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.service) req.body.service = req.params.id;
  next();
};

export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await reviewService.getAllReviews();
  res.status(200).json({
    status: "success",
    results: reviews.length,
    reviews,
  });
});

// Get my reviews
export const getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await reviewService.getMyReviews(req.user.id);
  res.status(200).json({
    status: "success",
    results: reviews.length,
    reviews,
  });
});

// Get a single review
export const getReview = catchAsync(async (req, res, next) => {
  const review = await reviewService.getReview(req.params.id);
  if (!review) {
    return next(new ErrorHandler("Review not found!", 404));
  }
  res.status(200).json({
    status: "success",
    review,
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  const verify = await reviewService.verifyReview({
    ...req.body,
    user: req.user.id,
  });
  if (verify.length > 0) {
    return next(new ErrorHandler("You have already published a review!", 400));
  }
  const review = await reviewService.createReview({
    ...req.body,
    user: req.user.id,
  });
  res.status(200).json({
    status: "success",
    review,
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const updatedReview = await reviewService.updateReview(
    req.params.id,
    req.body
  );
  if (!updatedReview) {
    return next(new ErrorHandler("Review not found!", 404));
  }
  res.status(200).json({
    status: "success",
    review: updatedReview,
  });
});

// Delete a review
export const deleteReview = catchAsync(async (req, res, next) => {
  const deletedReview = await reviewService.deleteReview(req.params.id);
  if (!deletedReview) {
    return next(new ErrorHandler("Review not found!", 404));
  }
  res.status(204).json({
    status: "success",
    message: "Review deleted successfully",
  });
});
