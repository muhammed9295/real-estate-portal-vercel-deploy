import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiErrors.js";
import { uploadMultipleOnCloudinary } from "../utils/cloudinary.js";
import { Property } from "../models/property.models.js";
import { response } from "express";

// Adding Properties
const addProperties = asyncHandler(async (req, res) => {
  const {
    title,
    propertyType,
    listingType,
    bedrooms,
    bathrooms,
    amenities,
    address,
    neighbourhood,
    city,
    description,
    price,
  } = req.body;

  if (
    [
      title,
      propertyType,
      listingType,
      bedrooms,
      bathrooms,
      neighbourhood,
      city,
      price,
    ].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "* fields are required");
  }

  // check for images
  const propertyImagesLocalPath = req.files.map((file) => file.path);
  // console.log(propertyImagesLocalPath)
  if (!propertyImagesLocalPath) {
    throw new apiError(400, "Images are required");
  }
  // check for images

  // upload images on cloudinary
  const propertyImagesUploaded = await uploadMultipleOnCloudinary(
    propertyImagesLocalPath
  );
  const propertyImages = propertyImagesUploaded.map((item) => item.url);
  // upload images on cloudinary

  // Create properties object and create in database
  const properties = await Property.create({
    title,
    propertyType,
    listingType,
    bedrooms,
    bathrooms,
    amenities,
    address,
    neighbourhood,
    city,
    description,
    price,
    agent: req.agent._id,
    propertyImages: propertyImages,
  });
  // Create properties object and create in database

  // Final check if the properties object are created
  if (!properties) {
    throw new apiError(500, "Something went wrong while adding property");
  }
  // Final check if the properties object are created

  return res
    .status(200)
    .json(new apiResponse(200, properties, "Property is successfully added"));
});
// Adding Properties

// Get Properties
const getProperties = asyncHandler(async (req, res) => {
  const properties = await Property.aggregate([
    {
      $lookup: {
        from: "agents",
        localField: "agent",
        foreignField: "_id",
        as: "agents",
      },
    },
    {
      $addFields: {
        agent_details: {
          $arrayElemAt: ["$agents", 0],
        },
      },
    },
    {
      $project: {
        title: 1,
        propertyType: 1,
        listingType: 1,
        bedrooms: 1,
        bathrooms: 1,
        amenities: 1,
        propertyImages: 1,
        address: 1,
        neighbourhood: 1,
        city: 1,
        description: 1,
        price: 1,
        agent_details: {
          _id: "$agent_details._id",
          firstName: "$agent_details.firstName",
          lastName: "$agent_details.lastName",
          email: "$agent_details.email",
          companyName: "$agent_details.companyName",
          phone: "$agent_details.phone",
          avatar: "$agent_details.avatar",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new apiResponse(200, properties, "All properties fetched"));
});
// Get Properties

// Get Single Properties
const getSingleProperties = asyncHandler(async (req, res) => {
  const singleProperty = await Property.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "agents",
        localField: "agent",
        foreignField: "_id",
        as: "agents",
      },
    },
    {
      $addFields: {
        agent_details: {
          $arrayElemAt: ["$agents", 0],
        },
      },
    },
    {
      $project: {
        title: 1,
        propertyType: 1,
        listingType: 1,
        bedrooms: 1,
        bathrooms: 1,
        amenities: 1,
        propertyImages: 1,
        address: 1,
        neighbourhood: 1,
        city: 1,
        description: 1,
        price: 1,
        agent_details: {
          _id: "$agent_details._id",
          firstName: "$agent_details.firstName",
          lastName: "$agent_details.lastName",
          email: "$agent_details.email",
          companyName: "$agent_details.companyName",
          phone: "$agent_details.phone",
          avatar: "$agent_details.avatar",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new apiResponse(200, singleProperty, "Single properties fetched"));
});
// Get Single Properties

// Get Properties - Buy
const getBuyProperties = asyncHandler(async (req, res) => {
  const buyProperties = await Property.find({ listingType: "Buy" });

  return res
    .status(200)
    .json(new apiResponse(200, buyProperties, "Buy properties fetched"));
});
// Get Properties - Buy

// Get Properties - Sale
const getRentProperties = asyncHandler(async (req, res) => {
  const saleProperties = await Property.find({ listingType: "Rent" });

  return res
    .status(200)
    .json(new apiResponse(200, saleProperties, "Sale properties fetched"));
});
// Get Properties - Sale

// Get Agent Created Properties
const getAgentProperties = asyncHandler(async (req, res) => {
  const agentProperties = await Property.find({ agent: req.agent._id });

  return res
    .status(200)
    .json(new apiResponse(200, agentProperties, "Agents properties fetched"));
});
// Get Agent Created Properties

// Update Single Properties
// Update Single Properties

// Delete Single Properties
const deleteSingleProperties = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the id
    if (!id?.trim()) {
      throw new apiError(400, "Property id is required");
    }

    // Find the id and delete
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      throw new apiError(404, "Property not found");
    }

    return res
      .status(200)
      .json(
        new apiResponse(200, deletedProperty, "Property deleted successfully")
      );
  } catch (error) {
    console.error("Error deleting property", error);
    res.status(500).send({ message: "Error deleting property" });
  }
});
// Delete Single Properties

// Search properties using filters
const getSearchProperties = asyncHandler(async (req, res) => {
  // const {title, propertyType, listingType, bedrooms, bathrooms, city, neighbourhood, minPrice, maxPrice} = req.query;

  let query = {};
  if (req.query.propertyType) {
    query.propertyType = req.query.propertyType;
  }
  if (req.query.listingType) {
    query.listingType = req.query.listingType;
  }
  if (req.query.bedrooms) {
    query.bedrooms = req.query.bedrooms;
  }
  if (req.query.bathrooms) {
    query.bathrooms = req.query.bathrooms;
  }
  if (req.query.city) {
    query.city = req.query.city;
  }
  if (req.query.neighbourhood) {
    query.neighbourhood = req.query.neighbourhood;
  }
  if (req.query.minPrice) {
    query.price = query.price || {};
    query.price.$gte = parseInt(req.query.minPrice);
  }
  if (req.query.maxPrice) {
    query.price = query.price || {};
    query.price.$lte = parseInt(req.query.maxPrice);
  }

  if (!query.price) {
    query.price = { $gte: 0, $lte: 1000000000000 }; // Example default values
  }

  const searchResults = await Property.find(query);
  // .where("propertyType")
  // .equals(req.query.propertyType)
  // .where("listingType")
  // .equals(req.query.listingType || undefined)
  // .where("bedrooms")
  // .equals(req.query.bedrooms)
  // .where("bathrooms")
  // .equals(req.query.bathrooms)
  // .where("city")
  // .equals(req.query.city)
  // .where("neighbourhood")
  // .equals(req.query.neighbourhood)

  return res
    .status(200)
    .json(new apiResponse(200, searchResults, "Search results fetched"));
});
// Search properties using filters

export {
  addProperties,
  getProperties,
  getSingleProperties,
  deleteSingleProperties,
  getAgentProperties,
  getBuyProperties,
  getRentProperties,
  getSearchProperties,
};
