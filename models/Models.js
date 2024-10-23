import mongoose from "mongoose";
//Main Model all crud ops will be done from here meanwhile other ops will be done form the extended classes :)
class Model {
  constructor(mongooseModel) {
    this.mongooseModel = mongooseModel;
  }

  async create(data) {
    return await this.mongooseModel.create(data);
  }

  async getAll(query) {
    return await query.query;
  }

  //Changed this from findById to find only specifically
  async find(filter, selections = "", limit = "", populateOptions) {
    let query = this.mongooseModel.find(filter).select(selections).limit(limit);
    if (populateOptions) query = query.populate(populateOptions);
    return await query;
  }

  //Custom search for docs
  async findOne(filter, selections = "") {
    return await this.mongooseModel.findOne(filter).select(selections);
  }

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    return await this.mongooseModel.findById(id);
  }

  // async getMy(filter, selections = "") {
  //   return await this.mongooseModel.find(filter).select(selections);
  // }

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
