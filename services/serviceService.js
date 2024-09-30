import serviceModel from "../models/serviceModel.js";

class ServicesService {
  constructor(Model) {
    this.serviceModel = Model;
  }

  async createService(data) {
    return await this.serviceModel.createService(data);
  }

  async getAllServies() {
    return await this.serviceModel.getAllServies();
  }

  async getMyServices(userId) {
    return await this.serviceModel.getMyServices(userId);
  }

  async getOne(id) {
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
