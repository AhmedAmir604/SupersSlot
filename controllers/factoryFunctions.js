import APIFeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/appError.js";
import { catchAsync } from "./errorController.js";

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const query = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .fields()
      .limit();
    const docs = await query.query;
    res.status(200).json({
      count: docs.length,
      data: docs,
    });
  });

export const getMy = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find({ user: req.user.id });
    res.status(200).json({
      status: "success",
      doc,
    });
  });

export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
    if (!doc) {
      return next(new ErrorHandler("Cannot find a document with such ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new ErrorHandler("Cannot find a document with such ID", 404));
    }
    res.status(202).json({
      status: "success",
      data: doc,
    });
  });

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (!(await Model.findByIdAndDelete(req.params.id))) {
      return next(new ErrorHandler("Cannot find a document with such ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
