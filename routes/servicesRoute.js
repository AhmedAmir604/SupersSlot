import express from "express";
import {
  createService,
  deleteService,
  getService,
  getAllServices,
  updateService,
} from "../controllers/serviceController.js";
import reviewsRoute from "./reviewsRoute.js";

const servicesRotue = express.Router();

servicesRotue.use("/:id/reviews", reviewsRoute);

servicesRotue.route("/").get(getAllServices).post(createService);
servicesRotue
  .route("/:id")
  .get(getService)
  .delete(deleteService)
  .patch(updateService);

export default servicesRotue;
