import sharp from "sharp";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import { Comment } from "../models/comment.model.js";

export const createPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;
        if (!image) {
            return res.status(400).json({
                message: "Image is required",
                success: false
            });
        }
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat("jpeg")
            .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        })
        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            user.save();
        }
        await post.populate({ path: 'author' });
        return res.status(201).json({
            post: post,
            success: true,
            message: 'New Post Added'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username profilePicture' }).populate({ path: 'comments', options: { sort: { createdAt: -1 } }, populate: { path: 'author' } });
        return res.status(200).json({   
            posts: posts,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const authorId = req.id;
        const user = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({ path: 'author', select: 'username profilePicture' })
            .populate({ path: 'comments', options: { sort: { createdAt: -1 } }, populate: { path: 'author', select: 'username profilePicture' } });

        return res.status(200).json({
            posts: user,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

export const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }
        await post.updateOne({
            $addToSet:
                { likes: userId }
        })
        post.save();
        return res.status(200).json({
            message: "Post liked",
            success: true
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

export const unlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }
        await post.updateOne({ $pull: { likes: userId } });
        post.save();
        return res.status(200).json({
            message: "Post unliked",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

export const addComments = async (req, res) => {
    try {


        const userId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({
                message: "Comment is required",
                success: false
            });
        }
        const comment = await Comment.create({
            text: content,
            author: userId,
            post: postId
        });
        await comment.populate({ path: 'author', select: 'username profilePicture' });
        post.comments.push(comment._id);
        post.save();
        return res.status(201).json({
            message: 'Comment added',
            comment: comment,
            success: true
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

export const getCommentsOfPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 }.populate({ path: 'author', select: 'username profilePicture' }));
        if (!comments) {
            return res.status(404).json({
                message: "Comments not found",
                success: false
            });
        }
        return res.status(200).json({
            comments: comments,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }
        if (post.author.toString() !== userId) {
            return res.status(401).json({
                message: "You are not authorized to delete this post",
                success: false
            });
        }
        await Post.findByIdAndDelete(postId);
        const user = await User.findById(userId);
        if (user) {
            user.posts.pull(postId);
            user.save();
        }
        await Comment.deleteMany({ post: postId });

        return res.status(200).json({
            message: "Post deleted",
            success: true
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

export const bookmarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        if (user.bookmarks.includes(postId)) {
            await user.updateOne({ $pull: { bookmarks: postId } });
            user.save();
            return res.status(200).json({
                message: "Post unbookmarked",
                success: true
            });
        } else {
            await user.updateOne({ $addToSet: { bookmarks: postId } });
            user.save();
            return res.status(200).json({
                message: "Post bookmarked",
                success: true
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}