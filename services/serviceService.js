import mongoose from "mongoose";
import serviceModel from "../models/ServicesModel.js";
import APIFeatures from "../utils/apiFeatures.js";

class ServicesService {
  constructor(Model) {
    this.serviceModel = Model;
  }

  async createService(data) {
    return await this.serviceModel.create(data);
  }

  async getAllServies(req) {
    const query = new APIFeatures(
      this.serviceModel.mongooseModel.find(),
      req.query
    )
      .filter()
      .sort()
      .fields()
      .limit();
    return await this.serviceModel.find(query);
  }

  async getMyServices(userId) {
    return await this.serviceModel.findOne(userId);
  }

  async getOne(id) {
    return await this.serviceModel.findById(id);
  }

  async deleteService(id) {
    return await this.serviceModel.findByIdAndDelete(id);
  }

  async updateService(id, data) {
    return await this.serviceModel.findByIdAndUpdate(id, data);
  }
}

const servicesService = new ServicesService(serviceModel);

export default servicesService;
