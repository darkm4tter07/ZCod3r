import mongoose, { Schema } from "mongoose";

const replySchema = new Schema({
    reply: {
        type: String,
        required: true,
        trim: true,
    },
    repliedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    replies: [replySchema],
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    }
}, { timestamps: true });

export const Comment = mongoose.model("Comment", commentSchema);