import serviceSchema from "../schemas/serviceSchema.js";
import mongoose from "mongoose";
import APIFeatures from "../utils/apiFeatures.js";

const Service = mongoose.model("Service", serviceSchema);

class ServiceModel {
  async createService(data) {
    return await Service.create(data);
  }

  async getAllServies(req) {
    const query = new APIFeatures(Service.find(), req.query)
      .filter()
      .sort()
      .fields()
      .limit();
    return await query.query;
  }

  async getMyServices(id) {
    return await Service.find({ user: id });
  }

  async getOne(id, selections = "") {
    return await Service.findById(id).select(selections);
  }

  async deleteService(id) {
    return await Service.findByIdAndDelete(id);
  }

  async updateService(id, data) {
    return await Service.findByIdAndUpdate(id, data, { new: true });
  }
}

const serviceModel = new ServiceModel();

export default serviceModel;
