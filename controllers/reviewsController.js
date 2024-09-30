import Review from "../schemas/reviewsSchema.js";
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

export const getAllReview = getAll(Review);

export const getMyReview = getMy(Review);

export const getReview = getOne(Review, "user service");

export const createReview = createOne(Review);

export const updateReview = updateOne(Review);

export const deleteReview = deleteOne(Review);
