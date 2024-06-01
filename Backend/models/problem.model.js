import mongoose, { Schema } from "mongoose";

const problemSchema = new Schema({
    title:{
        type: String,
        required: true,
        index: true,
    },
    description:{
        type: String,
        required: true,
    },
    difficulty:{
        type: String,
        required: true,
    },
    solution:{
        type: String,
        required: true,
    },
    testcases:{
        type: Array,
        required: true,
    },
    testResults:{
        type: Array,
        required: true,
    },
    tags:{
        type: Array,
        required: true,
    },
    constraints: {
        type: String,
        required: false,
    },
},{timestamps: true});

export const Problem = mongoose.model("Problem", problemSchema);