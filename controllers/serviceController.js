import Service from "../models/serviceModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import { catchAsync } from "./errorController.js";

export const getAllServices = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const service = new APIFeatures(Service.find(), req.query)
    .filter()
    .sort()
    .fields()
    .limit();
  const services = await service.query;

  res.status(200).json({
    length: services.length,
    services,
  });
});

export const findAService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  res.status(200).json({
    service,
  });
});

export const deleteAService = catchAsync(async (req, res, next) => {
  await Service.findOneAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const addAService = catchAsync(async (req, res, next) => {
  const service = await Service.create(req.body);
  res.status(200).json({
    service,
  });
});

export const updateAService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(202).json({
    service,
  });
});
