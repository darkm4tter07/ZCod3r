import mongoose, {Schema} from "mongoose";

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
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    replies: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    post:{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    }
}, {timestamps: true});

export const Comment = mongoose.model("Comment", commentSchema);