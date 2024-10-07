import express from "express";
import {
  createService,
  deleteService,
  getService,
  getAllServices,
  updateService,
  aliasTop5Services,
  checkUserRoles,
} from "../controllers/serviceController.js";
import reviewsRoute from "./reviewsRoute.js";
import { protect, restrictTo } from "../controllers/authController.js";

const servicesRotue = express.Router();

servicesRotue.use("/:id/reviews", reviewsRoute);
//Open routes for public to access :)
//Always place the specific route ("/top-5-services") before the dynamic "/:id" ensures that Express correctly matches the more specific route.
servicesRotue.get("/top-5-services", aliasTop5Services, getAllServices);
servicesRotue.route("/:id").get(getService);
servicesRotue.route("/").get(getAllServices);

servicesRotue.use(protect, restrictTo("admin", "service-provider"));
servicesRotue.post("/", checkUserRoles("service"), createService);
servicesRotue.route("/:id").delete(deleteService).patch(updateService);

export default servicesRotue;
