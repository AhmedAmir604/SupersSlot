import APIFeatures from "../utils/apiFeatures.js";
//This service contains all curd operations
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
    return await this.model.getAll(query);
  }

  async find(filter, selections, limit, populateOptions) {
    return await this.model.find(filter, selections, limit, populateOptions);
  }

  async findOne(filter, populateOptions) {
    return await this.model.findOne(filter, populateOptions);
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

  async findByIdAndUpdate(id) {
    return await this.model.findByIdAndUpdate(id);
  }

  async updateMany(filter, operation) {
    return await this.model.updateMany(filter, operation);
  }

  async deleteMany(filter) {
    return await this.model.deleteMany(filter);
  }
}

export default Service;
