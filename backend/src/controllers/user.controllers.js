import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiErrors.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existedUser = await User.findOne({
    email,
  });

  if (existedUser) {
    throw new apiError(400, "Email already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User registered successfully"));
});
// Register User

// Generate Access and Refresh Token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: true });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};
// Generate Access and Refresh Token

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new apiError(400, "Email is required to login");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new apiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new apiError(401, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});
// Login User

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out successfully"));
});
// Logout User

// Get User Details
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new apiResponse(200, req.user, "Current User Fetched"));
});
// Get User Details

// Update User Details(
const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  const avatarLocalPath = req.file?.path;

  const newAvatar = !avatarLocalPath
    ? ""
    : await uploadOnCloudinary(avatarLocalPath);

  const updatedFields = {
    firstName,
    lastName,
    email,
    phone,
    avatar: newAvatar.url,
  };

  Object.keys(updatedFields).forEach(
    (key) =>
      (updatedFields[key] === "" || undefined) && delete updatedFields[key]
  );

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: updatedFields,
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(201)
    .json(new apiResponse(200, updatedUser, "User updated successfully"));
});
// Update User Details

// Add wishlist or property id
const addWishlist = asyncHandler(async (req,res)=>{
  const {id} = req.params;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $addToSet: {
        properties: id,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(201)
    .json(new apiResponse(200, user, "wishlist updated successfully"));
})
// Add wishlist or property id

// Get wishlist
const getWishList = asyncHandler(async(req, res)=>{
  const wishlist = await User.aggregate(
    [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $lookup: {
          from: "properties",
          localField: "properties",
          foreignField: "_id",
          as: "properties"
        }
      },
      {
        $project: {
          firstName: 1,
          lastName:2,
          email:1,
          properties:{
            $map:{
              input: "$properties",
              as: "property",
              in: {
                _id: "$$property._id",
                title: "$$property.title",
                bedrooms:"$$property.bedrooms",
                bathrooms:"$$property.bathrooms",
                propertyImages: "$$property.propertyImages",
                neighbourhood: "$$property.neighbourhood",
                city: "$$property.city",
                price: "$$property.price",
                address:"$$property.address",
                description: "$$property.description",
              }
            }
          }
          
        }
      }
      
    ]
  )

  return res
   .status(200)
   .json(new apiResponse(200, wishlist, "Wishlist fetched successfully"));
})
// Get wishlist



export { registerUser, loginUser, logoutUser, getCurrentUser, updateUser, addWishlist, getWishList };
