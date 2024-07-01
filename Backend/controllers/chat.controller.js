import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User} from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";

const createChat = asyncHandler(async (req, res) => {

});

const getChats = asyncHandler(async (req, res) => {

});

const getChat = asyncHandler(async (req, res) => {
    const {senderId, recieverId} = req.body;
    if(!senderId || !recieverId){
        throw new ApiError(400, "Sender or Reciever id is missing");
    }
    const chat = await Chat.find({
        isGroup: false,
        $and: [
            {users:{ $elemMatch: { $eq: senderId}}},
            {users:{ $elemMatch: { $eq: recieverId}}}
        ]
    }).populate("users").populate("latestMessage");
});

const createGroupChat = asyncHandler(async (req, res) => {

});

const addUsersToGroup = asyncHandler(async (req, res) => {

});

const removeUserFromGroup = asyncHandler(async (req, res) => {

});

const renameGroup = asyncHandler(async (req, res) => {

});
export {createChat, getChats, getChat, createGroupChat, addUsersToGroup, removeUserFromGroup, renameGroup};