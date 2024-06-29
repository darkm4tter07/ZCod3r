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
            .json(new ApiResponse(200,  "User Created", newUser));
    } else {
        return res
            .status(200)
            .json(new ApiResponse(200, "User Logged In", userExists));
    }
});

const getUser = asyncHandler(async (req, res) => {
    if (!req.params.username) {
        throw new ApiError(400, "User id is missing");
    }
    const username = req.params.username;
    const user = await User.findOne({username: username}).populate({
        path: 'createdPosts',
        select: 'title imageLinks createdAt',
    }).populate({
        path: 'savedPosts',
        select: 'title imageLinks createdAt',
    }).populate({
        path: 'following',
        select: 'fullName username profileUrl'
    })
    .populate({
        path: 'followers',
        select: 'fullName username profileUrl'
    });
    if (!user) {
        return res
            .status(203)
            .json(new ApiResponse(203, "User not found", null));
    }
    return res.status(200).json(new ApiResponse(200, "User found", user));
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
        .json(new ApiResponse(200, "Profile Picture Updated", user));

});

const updateProfile = asyncHandler(async (req, res) => {
    const username = req.params.username;
    if(!username){
        throw new ApiError(400, "User id is missing");
    }
    const {} = req.body;
    const user = await User.find({username: username});
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    
    //user updtation logic


    await user.save({ validateBeforeSave: false });
    return res
        .status(200)
        .json(new ApiResponse(200, "Profile Updated", user));
});

const toggleFollowing = asyncHandler(async (req, res) => {
    const { userId, followId } = req.body;
    const user = await User.findById(userId);
    const followUser = await User.findById(followId);

    if (!user || !followUser) {
        throw new ApiError(404, "User not found");
    }

    const isFollowing = user.following.includes(followId);

    if (isFollowing) {
        user.following = user.following.filter((id) => id.toString() !== followId.toString());
        followUser.followers = followUser.followers.filter((id) => id.toString() !== userId.toString());
    } else {
        user.following.push(followId);
        followUser.followers.push(userId);
    }

    await user.save({ validateBeforeSave: false });
    await followUser.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, "Following Toggled", user));
});


const getAllUsers = asyncHandler(async (req, res) => {});

export { loginUser, getUser, updateProfilePicture, updateProfile, getAllUsers, toggleFollowing};
