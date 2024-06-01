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
        required: true,
    },
    savedProblems:[{
        type: Schema.Types.ObjectId,
        ref: "Problem"
    }],
    solvedProblems:[{
        type: Schema.Types.ObjectId,
        ref: "Problem"
    }],
    token:{
        type: String,
        required: true
    }
},{timestamps: true});

export const User = mongoose.model("User", userSchema);