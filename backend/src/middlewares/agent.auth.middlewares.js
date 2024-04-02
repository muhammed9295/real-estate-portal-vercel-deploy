import { Agent } from "../models/agent.models.js";
import { apiError } from "../utils/apiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyAgentJWT = asyncHandler(async (req, _, next)=>{
    try {
        const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ", "")
        
        if(!token){
            throw new apiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const agent = await Agent.findById(decodedToken?._id).select("-password -refreshToken")

        if(!agent){
            throw new apiError(401, "Invalid access token")
        }

        req.agent = agent
        next()
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid access token")
    }
})