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
  address: {
    street: {
      type: String,
      required: [true, "Must have an address"],
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: Number,
    coordinates: [Number],
  },
  description: {
    type: String,
    required: [true, "A service must have service"],
    minLength: [10, "Min length should be 10"],
    maxLength: [400, "Max length should be 400"],
  },
  phoneNumber: {
    type: String,
  },
  openingHours: {
    type: String,
    required: [true, "A service must have Opening Hours!"],
  },
  images: {
    type: [String],
  },
  categories: {
    type: [String],
    required: [true, "A service must have categories"],
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
  employees: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A service Must have Employees!"],
    },
  ],
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
