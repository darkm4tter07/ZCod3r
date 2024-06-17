import { Router } from "express";
import {
    createPost,
    getSinglePost,
    getPosts,
    deletePost,
    toggleLike,
    commentOnPost,
    replyToComment,
    getComments,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/create").post(upload.array("imageFiles"), createPost);

router.route("/:postId").get(getSinglePost);

router.route("/").get(getPosts);

router.route("/toggleLike/:postId").put(toggleLike);

router.route("/post/:postId").get(getSinglePost);

router.route("/comment/:postId").post(commentOnPost);

router.route("/reply/:commentId").post(replyToComment);

router.route("/comment/:postId").get(getComments);

router.route("/delete/:postId").delete(deletePost);

export default router;
