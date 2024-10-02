import mongoose from "mongoose";
import serviceModel from "../models/serviceModel.js";

class ServicesService {
  constructor(Model) {
    this.serviceModel = Model;
  }

  async createService(data) {
    return await this.serviceModel.createService(data);
  }

  async getAllServies(req) {
    return await this.serviceModel.getAllServies(req);
  }

  async getMyServices(userId) {
    return await this.serviceModel.getMyServices(userId);
  }

  async getOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    return await this.serviceModel.getOne(id);
  }

  async deleteService(id) {
    return await this.serviceModel.deleteService(id);
  }

  async updateService(id, data) {
    return await this.serviceModel.updateService(id, data);
  }
}

const servicesService = new ServicesService(serviceModel);

export default servicesService;
