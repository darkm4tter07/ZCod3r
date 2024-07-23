import mongoose, { Schema } from "mongoose";

const problemSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        default: "Solution for this problem is not posted yet",
    },
    inputFormat: {
        type: String,
        required: false,
    },
    outputFormat: {
        type: String,
        required: false,
    },
    example: {
        type: Object,
        required: false,
        properties: {
            input: { type: String, required: true },
            output: { type: String, required: true }
        }
    },
    explanation: {
        type: String,
        required: false,
    },
    testcases: {
        type: Array,
        required: true,
    },
    testResults: {
        type: Array,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    constraints: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isPrivate: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export const Problem = mongoose.model("Problem", problemSchema);
