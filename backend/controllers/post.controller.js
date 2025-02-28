import sharp from "sharp";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const createPost=async(req,res)=>{
    try {
        const {caption}=req.body;
        const image=req.file;
        const authorId=req.id;
        if(!image){
            return res.status(400).json({
                message:"Image is required",
                success:false
            });
        }
        const optimizedImageBuffer= await sharp(image.buffer)
        .resize({width:800,height:800,fit:'inside'})
        .toFormat("jpeg")
        .toBuffer();

        const fileUri= `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;
        const cloudResponse= await cloudinary.uploader.upload(fileUri);
        const post =await Post.create({
            caption,
            image:cloudResponse.secure_url,
            author:authorId
        })
        const user=await User.findById(authorId);
        if(user){
            user.posts.push(post._id);
            user.save();
        }
        await  post.populate({path:'author'});
        return res.status(201).json({
            post:post,
            success:true
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

export const getAllPosts=async(req,res)=>{
    try {
        const posts=await Post.find().sort({createdAt:-1})
        .populate({path:'author',select:'username,proflePicture'})
        .populate({path:'likes',createdAt:-1})
        .populate({path:'comments',options:{sort:{createdAt:-1}}});
        return res.status(200).json({
            posts:posts,
            success:true
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