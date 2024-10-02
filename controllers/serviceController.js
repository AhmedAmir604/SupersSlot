import ErrorHandler from "../utils/appError.js";
import { catchAsync } from "./errorController.js";
import servicesService from "../services/ServicesService.js";

//Middlewares
export const aliasTop5Services = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  next();
};

export const createService = catchAsync(async (req, res, next) => {
  const service = await servicesService.create(req.body);
  res.status(201).json({
    status: "success",
    service,
  });
});

export const getAllServices = catchAsync(async (req, res, next) => {
  const services = await servicesService.getAll(req);
  res.status(200).json({
    status: "success",
    results: services.length,
    services,
  });
});

export const getMyServices = catchAsync(async (req, res, next) => {
  const services = await servicesService.getMy(req.user.id);
  res.status(200).json({
    status: "success",
    results: services.length,
    services,
  });
});

export const getService = catchAsync(async (req, res, next) => {
  const service = await servicesService.getOne(req.params.id);
  if (service) {
    res.status(200).json({
      status: "success",
      service,
    });
  } else {
    next(new ErrorHandler("cannot find with this id service!", 404));
  }
});

export const updateService = catchAsync(async (req, res, next) => {
  const updatedService = await servicesService.updateOne(
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
  const deletedService = await servicesService.deleteOne(req.params.id);
  if (!deletedService) {
    return next(new ErrorHandler("Service not found!", 404));
  }
  res.status(204).json({
    status: "success",
    message: "Service deleted successfully",
  });
});
