import Model from "./Models.js";
import bookingSchema from "../schemas/bookingSchema.js";
import mongoose from "mongoose";

bookingSchema.pre("save", async function (next) {
  this.startTime = new Date(this.startTime).toISOString();
  this.endTime = new Date(this.endTime).toISOString();
  next();
});

bookingSchema.pre("save", async function (next) {
  this.price = (await serviceModel.getOne(this.service, "price")).price;
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

const bookingModel = new Model(Booking);
