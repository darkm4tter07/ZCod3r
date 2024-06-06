import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    body:{
        type: String,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    imageLinks:[{
        type: String,
    }],
    likes:[{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    tags:[{
        type: String,
        trim: true,
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    
},{timestamps: true});

export const Post = mongoose.model("Post", postSchema);