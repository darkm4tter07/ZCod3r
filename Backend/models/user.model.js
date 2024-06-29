import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        index: true,
    },
    profileUrl: {
        type: String,
    },
    savedProblems:[{
        type: Schema.Types.ObjectId,
        ref: "Problem"
    }],
    solvedProblems:[{
        type: Schema.Types.ObjectId,
        ref: "Problem"
    }],
    createdPosts:[{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    savedPosts:[{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    following:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    followers:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
},{timestamps: true});

export const User = mongoose.model("User", userSchema);