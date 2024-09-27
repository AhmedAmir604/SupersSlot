import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A service must have a name"],
      trim: true,
      maxLength: [50, "Service name must not exceed 50 characters"],
    },
    shopName: {
      type: String,
      required: [true, "A shop must have a name"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, "Description should not exceed 500 characters"],
    },
    serviceType: {
      type: String,
      enum: ["barber", "salon", "spa", "massage"],
      required: [true, "A service type must be specified"],
    },
    priceRange: {
      type: String, // Could store price range as string (e.g., "$10 - $50")
      required: [true, "Price range must be specified"],
    },
    address: {
      street: { type: String, required: [true, "A street must be specified"] },
      city: { type: String, required: [true, "A city must be specified"] },
      state: { type: String, required: [true, "A state must be specified"] },
      zipCode: {
        type: String,
        required: [true, "A zip code must be specified"],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.0,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: String,
      required: [true, "A phone number must be provided"],
    },
    openingHours: {
      type: String, // e.g., "Mon-Fri: 9 AM - 8 PM"
      required: [true, "Opening hours must be specified"],
    },
    images: [String], // URLs for images of the shop or services
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // Assuming the owner is also a registered user
      required: [true, "A service must have an owner"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate for referencing appointments related to this service
serviceSchema.virtual("appointments", {
  ref: "Appointment",
  foreignField: "service",
  localField: "_id",
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
