import {asyncHandler} from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import admin from "../config/firebase-config.js";
import {ApiError} from "../utils/ApiError.js"
import {deleteFromCloudinary, uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const loginUser = asyncHandler(async (req,res) => {
    if(!req.header.authorization){
        throw new ApiError(401, "Unauthorized Invalid Token");
    }

    const token = req.header.authorization.split(" ")[1];
    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        if(!decodedValue){
            throw new ApiError(500, "Unauthorized User");
        }
        const userExists = await User.findOne({email:decodedValue.email});  
        if(!userExists){
            const newUser = new User({
                username: decodedValue.email.split("@")[0],
                email: decodedValue.email,
                fullName: decodedValue.name,
                profileUrl: decodedValue.picture,
            });
            await newUser.save();
            return res.status(200).json(new ApiResponse(200, "User Created", newUser));
        }else{
            return res.status(200).json(new ApiResponse(200, "User Logged In", userExists));
        }
    } catch (error) {
        throw new ApiError(500, "Internal Server Error");
    }
});

export {loginUser};