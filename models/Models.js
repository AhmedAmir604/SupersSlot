import mongoose from "mongoose";

class Model {
  constructor(mongooseModel) {
    this.mongooseModel = mongooseModel;
  }

  async create(data) {
    return await this.mongooseModel.create(data);
  }

  async find(query) {
    return await query.query;
  }

  async findOne(filter) {
    return await this.mongooseModel.findOne(filter);
  }

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    return await this.mongooseModel.findById(id);
  }

  async findByIdAndUpdate(id, data, options = { new: true }) {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    return await this.mongooseModel.findByIdAndUpdate(id, data, options);
  }

  async findByIdAndDelete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    return await this.mongooseModel.findByIdAndDelete(id);
  }

  async updateMany(filter, operation) {
    return await this.mongooseModel.updateMany(filter, operation);
  }

  async deleteMany(filter) {
    return await this.mongooseModel.deleteMany(filter);
  }
}

export default Model;
