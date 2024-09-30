import serviceModel from "../models/serviceModel.js";
import ErrorHandler from "../utils/appError.js";
import { catchAsync } from "./errorController.js";

export const createService = catchAsync(async (req, res, next) => {
  const service = await serviceModel.createService(req.body);
  res.status(201).json({
    status: "success",
    service,
  });
});

export const getAllServices = catchAsync(async (req, res, next) => {
  const services = await serviceModel.getAllServies();
  res.status(200).json({
    status: "success",
    results: services.length,
    services,
  });
});

export const getMyServices = catchAsync(async (req, res, next) => {
  const services = await serviceModel.getMyServices(req.user.id);
  res.status(200).json({
    status: "success",
    results: services.length,
    services,
  });
});

export const getService = catchAsync(async (req, res, next) => {
  const service = await serviceModel.getOne(req.params.id);
  if (!service) {
    return next(new ErrorHandler("Service not found!", 404));
  }
  res.status(200).json({
    status: "success",
    service,
  });
});

export const updateService = catchAsync(async (req, res, next) => {
  const updatedService = await serviceModel.updateService(
    req.params.id,
    req.body
  );
  if (!updatedService) {
    return next(new ErrorHandler("Service not found!", 404));
  }
  res.status(200).json({
    status: "success",
    service: updatedService,
  });
});

export const deleteService = catchAsync(async (req, res, next) => {
  const deletedService = await serviceModel.deleteService(req.params.id);
  if (!deletedService) {
    return next(new ErrorHandler("Service not found!", 404));
  }
  res.status(204).json({
    status: "success",
    message: "Service deleted successfully",
  });
});
