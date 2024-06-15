import { Router } from "express";
import {createPost, getSinglePost, getPosts, deletePost, likePost, commentOnPost, replyToComment} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route('/create').post(upload.array('imageFiles'), createPost);

router.route('/:postId').get(getSinglePost);

router.route('/').get(getPosts);

export default router;
