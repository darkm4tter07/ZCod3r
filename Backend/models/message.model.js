import mongoose, {Schema} from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    },
    content: {
        type: String,
        required: true,
    },
    
},{timestamps: true});

export const Message = mongoose.model("Message", messageSchema);