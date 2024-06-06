import {asyncHandler} from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js";

const loginUser = asyncHandler(async (req,res) => {
    if(!req.body) throw new ApiError(400, "Request body is missing");
    try {
        const {username, email, fullName, profileUrl} = req.body;
        const userExists = await User.findOne({email:email});  
        if(!userExists){
            const newUser = new User({
                username: username,
                email: email,
                fullName: fullName,
                profileUrl: profileUrl,
            });
            await newUser.save();
            return res.status(200).json(new ApiResponse(200,newUser, "User Created" ));
        }else{
            return res.status(200).json(new ApiResponse(200,userExists, "User Logged In"));
        }
    } catch (error) {
        throw new ApiError(500, `Internal server error: ${error.message}`);
    }
});

const getUser = asyncHandler(async (req,res) => {});

const updateProfilePicture = asyncHandler(async (req,res) => {});

const updateProfile = asyncHandler(async (req,res) => {});

const getAllUsers = asyncHandler(async (req,res) => {});

export {loginUser};