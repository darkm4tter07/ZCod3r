import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";

const loginUser = asyncHandler(async (req, res) => {
    if (!req.body) throw new ApiError(400, "Request body is missing");
    const { username, email, fullName, profileUrl } = req.body;
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
        const newUser = new User({
            username: username,
            email: email,
            fullName: fullName,
            profileUrl: profileUrl,
        });
        await newUser.save();
        return res
            .status(200)
            .json(new ApiResponse(200, newUser, "User Created"));
    } else {
        return res
            .status(200)
            .json(new ApiResponse(200, userExists, "User Logged In"));
    }
});

const getUser = asyncHandler(async (req, res) => {
    if (!req.params.username) {
        throw new ApiError(400, "User id is missing");
    }
    const username = req.params.username;
    const user = await User.find({username: username});
    if (!user) {
        return res
            .status(203)
            .json(new ApiResponse(203, null, "User not found"));
    }
    return res.status(200).json(new ApiResponse(200, user, "User found"));
});

const updateProfilePicture = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Request body is missing");
    }
    const username = req.params.username;
    if (!username) {
        throw new ApiError(400, "User id is missing");
    }
    const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
    const user = await User.find({username: username});
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const avatarToBeDeleted = user.profileUrl;
    user.profileUrl = avatarUrl;
    await user.save({ validateBeforeSave: false });
    if(avatarToBeDeleted.length > 0){
        await deleteFromCloudinary(avatarToBeDeleted);
    }
    return res
        .status(200)
        .json(new ApiResponse(200, user, "Profile Picture Updated"));

});

const updateProfile = asyncHandler(async (req, res) => {});

const getAllUsers = asyncHandler(async (req, res) => {});

export { loginUser };
