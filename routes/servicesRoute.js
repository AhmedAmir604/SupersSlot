import express from "express";
import {
  addAService,
  deleteAService,
  findAService,
  getAllServices,
  updateAService,
} from "../controllers/serviceController.js";

const servicesRotue = express.Router();

servicesRotue.route("/").get(getAllServices).post(addAService);
servicesRotue
  .route("/:id")
  .get(findAService)
  .delete(deleteAService)
  .patch(updateAService);

export default servicesRotue;
