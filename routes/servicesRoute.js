import express from "express";
import {
  addAService,
  deleteAService,
  findAService,
  getAllServices,
  updateAService,
} from "../controllers/serviceController.js";
import reviewsRoute from "./reviewsRoute.js";

const servicesRotue = express.Router();

servicesRotue.use("/:id/reviews", reviewsRoute);

servicesRotue.route("/").get(getAllServices).post(addAService);
servicesRotue
  .route("/:id")
  .get(findAService)
  .delete(deleteAService)
  .patch(updateAService);

export default servicesRotue;
