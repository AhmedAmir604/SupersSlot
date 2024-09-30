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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
