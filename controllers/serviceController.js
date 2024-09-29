import Service from "../models/serviceModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import { catchAsync } from "./errorController.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./factoryFunctions.js";

export const getAllServices = getAll(Service);

export const findAService = getOne(Service);

export const deleteAService = deleteOne(Service);

export const addAService = createOne(Service);

export const updateAService = updateOne(Service);
