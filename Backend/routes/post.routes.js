import { Router } from "express";
import {createPost, getSinglePost, getPosts, updatePost, deletePost, likePost, commentOnPost, replyToComment} from "../controllers/post.controller.js";

const router = Router();


export default router;
