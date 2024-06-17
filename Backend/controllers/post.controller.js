import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comments.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import pLimit from "p-limit";

const createPost = asyncHandler(async (req, res) => {
    const { title, body, tags, createdBy } = req.body;
    let imageFiles = [];

    if (!title || !createdBy || !body) {
        throw new ApiError(400, "Title and createdBy fields are required");
    }
    if (Array.isArray(req.files)) {
        imageFiles = req.files.map((file) => file.path);
    } else {
        console.log("User has not uploaded any image files");
    }
    const postOwner = await User.findById(createdBy);
    if (!postOwner) {
        throw new ApiError(404, "User not found");
    }

    let uploadedImages = [];
    if (imageFiles.length > 0) {
        const limit = pLimit(3);
        const imageToUpload = imageFiles.map((file) => {
            return limit(async () => {
                const result = await uploadOnCloudinary(file);
                return result;
            });
        });
        uploadedImages = await Promise.all(imageToUpload);
    }
    const post = new Post({
        title,
        body,
        tags: tags.slice(0, 5),
        imageLinks: uploadedImages.map((image) => image.secure_url),
        createdBy,
    });
    await post.save();
    postOwner.createdPosts.push(post._id);
    await postOwner.save();
    return res
        .status(201)
        .json(
            new ApiResponse(201, "Post created successfully", {
                post,
                postOwner,
            })
        );
});

const getSinglePost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate(
        "createdBy",
        "fullName username profileUrl"
    );
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    return res.status(200).json(new ApiResponse(200, "Post found", post));
});

/*pagination
    skip(n) skips the first n documents
    limit(n) limits the number of documents to be returned*/

const getPosts = asyncHandler(async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    const posts = await Post.find()
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "username fullName profileUrl");

    if (posts.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(200, "No posts found", null));
    }
    return res.status(200).json(new ApiResponse(200, "Posts found", posts));
});

const deletePost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    if (post.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this post");
    }
    await post.remove();
    return res
        .status(200)
        .json(new ApiResponse(200, "Post deleted successfully", null));
});

const toggleLike = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const userId = req.query.userId;

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const isLiked = post.likes.includes(user._id);
    if (isLiked) {
        post.likes = post.likes.filter(
            (like) => like.toString() !== user._id.toString()
        );
    } else {
        post.likes.push(user._id);
    }

    await post.save();
    return res
        .status(200)
        .json(new ApiResponse(200, "Like toggled successfully", post));
});

const commentOnPost = asyncHandler(async (req, res) => {
    const [comment, postId, userId] = [
        req.body.comment,
        req.params.postId,
        req.query.userId,
    ];
    if (!comment) {
        throw new ApiError(400, "Comment is required");
    }
    let post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const commentadded = new Comment({
        message: comment,
        createdBy: userId,
        post: postId,
    });
    await commentadded.save();
    post.comments.push(commentadded._id);
    await post.save();
    post = await Post.findById(postId).populate({
        path: "comments",
        populate: [
            {
                path: "createdBy",
                select: "profileUrl username fullName",
            },
            {
                path: "replies",
                populate: {
                    path: "repliedBy",
                    select: "profileUrl username fullName",
                },
            },
        ],
    });
    return res
        .status(201)
        .json(new ApiResponse(201, "Comment added successfully", post));
});

const replyToComment = asyncHandler(async (req, res) => {
    const [reply, commentId, userId] = [
        req.body.reply,
        req.params.commentId,
        req.query.userId,
    ];
    if (!reply) {
        throw new ApiError(400, "Reply is required");
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const replyAdded = {
        reply,
        repliedBy: userId,
    };
    comment.replies.push(replyAdded);
    await comment.save();
    return res
        .status(201)
        .json(new ApiResponse(201, "Reply added successfully", comment));
});

const getComments = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;

    const comments = await Comment.find({ post: postId })
        .skip(skip)
        .limit(limit)
        .populate({
            path: 'replies',
            select: 'reply repliedBy createdAt',
            populate: { path: 'repliedBy', select: 'profileUrl username fullName' },
        })
        .populate('createdBy', 'profileUrl username fullName');

    if (comments.length === 0) {
        return res.status(204).json(new ApiResponse(204, "No comments found", null));
    }

    return res.status(200).json(new ApiResponse(200, "Comments found", comments));
});


export {
    createPost,
    getSinglePost,
    getPosts,
    deletePost,
    toggleLike,
    commentOnPost,
    replyToComment,
    getComments,
};
