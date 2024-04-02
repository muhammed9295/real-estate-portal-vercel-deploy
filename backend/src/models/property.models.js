import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    listingType: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    amenities: {
      type: String,
    },
    propertyImages: [
      {
        type: String,
      },
    ],
    address: {
      type: String,
    },
    neighbourhood: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    agent: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    }],
    contactedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema);
