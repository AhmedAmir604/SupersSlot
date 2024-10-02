import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A service must have a name"],
    unique: [true, "Name Should not be identical!"],
  },
  serviceType: {
    type: String,
    enum: ["barber", "salon", "spa", "massage"],
    required: [true, "A service type must be specified"],
  },
  price: {
    type: Number,
    required: [true, "Price must be specified"],
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Service owner (e.g., shop owner)
    required: [true, "A service must have an owner"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Review Cannot be less then 1"],
    max: [5, "Review Cannot be more then 5"],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default serviceSchema;
