import serviceSchema from "../schemas/serviceSchema.js";
import Model from "../models/Models.js";
import mongoose from "mongoose";

const Service = mongoose.model("Service", serviceSchema);
const serviceModel = new Model(Service);

export default serviceModel;
