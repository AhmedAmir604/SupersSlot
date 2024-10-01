import Service from "../schemas/serviceSchema.js";

class ServiceModel {
  async createService(data) {
    return await Service.create(data);
  }

  async getAllServies() {
    return await Service.find();
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
