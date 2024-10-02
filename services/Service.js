import APIFeatures from "../utils/apiFeatures.js";

class Service {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    return await this.model.create(data);
  }

  async getAll(req) {
    const query = new APIFeatures(this.model.mongooseModel.find(), req.query)
      .filter()
      .sort()
      .fields()
      .limit();
    return await this.model.find(query);
  }

  async getMy(userId) {
    return await this.model.findOne(userId);
  }

  async getOne(id) {
    return await this.model.findById(id);
  }

  async deleteOne(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async updateOne(id, data) {
    return await this.model.findByIdAndUpdate(id, data);
  }
  async findByIdAndDelete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async updateMany(filter, operation) {
    return await this.model.updateMany(filter, operation);
  }

  async deleteMany(filter) {
    return await this.model.deleteMany(filter);
  }
}

export default Service;
