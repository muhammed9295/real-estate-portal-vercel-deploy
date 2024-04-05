import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiErrors.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Agent } from "../models/agent.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Register Agents
const registerAgent = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existedAgent = await Agent.findOne({ email });

  if (existedAgent) {
    return new apiError(400, "Email already exists");
  }

  const agent = await Agent.create({
    firstName,
    lastName,
    email,
    password,
  });

  const createdAgent = await Agent.findById(agent._id).select(
    "-password -refreshToken"
  );

  if (!createdAgent) {
    throw new apiError(500, "Something went wrong while creating agent");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdAgent, "Agent created successfully"));
});
// Register Agents

// Generate Access and Refresh Token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const agent = await Agent.findById(userId);
    const access_token = await agent.generateAccessToken();
    const refresh_token = await agent.generateRefreshToken();

    agent.refreshToken = refresh_token;
    await agent.save({ validateBeforeSave: true });
    return { access_token, refresh_token };
  } catch (error) {
    throw new apiError(
      500,
      "Something went wrong while generating access token and refresh token"
    );
  }
};
// Generate Access and Refresh Token

// Login agents
const loginAgent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new apiError(400, "Email is required to login");
  }

  const agent = await Agent.findOne({ email });

  if (!agent) {
    throw new apiError(400, "User not found");
  }

  const isPasswordCorrect = await agent.isPasswordValid(password);

  if (!isPasswordCorrect) {
    throw new apiError(401, "Password is not correct");
  }

  const { access_token, refresh_token } = await generateAccessAndRefreshToken(
    agent._id
  );

  const loggedInUser = await Agent.findById(agent._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  };

  return res
    .status(200)
    .cookie("access_token", access_token, options)
    .cookie("refresh_token", refresh_token, options)
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, access_token, refresh_token },
        "Agent logged in successfully"
      )
    );
});
// Login agents

// Logout agents
const logoutAgent = asyncHandler(async (req, res) => {
  await Agent.findByIdAndUpdate(
    req.agent._id,
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
    sameSite: 'none',
  };

  return res
    .status(200)
    .clearCookie("access_token", options)
    .clearCookie("refresh_token", options)
    .json(new apiResponse(200, {}, "Agent logged out successfully"));
});
// Logout agents

// Get current agents details
const getCurrentAgent = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new apiResponse(200, req.agent, "Current agent details fetched"));
});
// Get current agents details

// Update current agents details
const updateCurrentAgent = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, companyName, phone } = req.body;

  const avatarLocalPath = req.file?.path;

  const newAvatar = !avatarLocalPath
    ? ""
    : await uploadOnCloudinary(avatarLocalPath);

  const updatedAgentFields = {
    firstName,
    lastName,
    email,
    companyName,
    phone,
    avatar: newAvatar.url,
  };

  Object.keys(updatedAgentFields).forEach(
    (key) =>
      (updatedAgentFields[key] === "" || undefined) &&
      delete updatedAgentFields[key]
  );

  const updatedAgent = await Agent.findByIdAndUpdate(
    req.agent?._id,
    {
      $set: updatedAgentFields,
    },
    { new: true }
  ).select("-password -refreshToken")

  return res
   .status(200)
   .json(new apiResponse(200, updatedAgent, "Agent updated successfully"))
});
// Update current agents details

export { registerAgent, loginAgent, logoutAgent, getCurrentAgent, updateCurrentAgent };
