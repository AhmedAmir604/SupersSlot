import serviceSchema from "../schemas/serviceSchema.js";
import mongoose from "mongoose";
import APIFeatures from "../utils/apiFeatures.js";

const Service = mongoose.model("Service", serviceSchema);

class ServiceModel {
  constructor(Model) {
    this.Model = Model;
  }

  async createService(data) {
    return await Service.create(data);
  }

  async getAllServies(query) {
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

const serviceModel = new ServiceModel(Service);

export default serviceModel;
