import {asyncHandler} from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";


const createPost = asyncHandler(async (req,res) => {});

const getSinglePost = asyncHandler(async (req,res) => {});

const getPosts = asyncHandler(async (req,res) => {});

const updatePost = asyncHandler(async (req,res) => {});

const deletePost = asyncHandler(async (req,res) => {});

const likePost = asyncHandler(async (req,res) => {});

const commentOnPost = asyncHandler(async (req,res) => {});

const replyToComment = asyncHandler(async (req,res) => {});

export {createPost, getSinglePost, getPosts, updatePost, deletePost, likePost, commentOnPost, replyToComment};