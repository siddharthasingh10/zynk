import {body, validationResult} from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";

export const register = async (req, res) => {   
    try {
        const {username, email, password} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        await  User.create({
            username,
            email,
            password:hashedPassword
        });
       return res.status(201).json({message:"User registered successfully",
            success:true, 
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password",
                success:false
            });
        }
        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: populatedPosts
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password",
                success:false
            });
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({message:`Welcome ${user.username}`,
            success:true,
            user
        });

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }

}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });

        return res.status(200).json({
            message: "Logged out successfully.",
            success: true
        });

    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: "Internal Server Error",
            success: false
        }
        );
    }
};

export const getUser=async(req,res)=>{
    try {
        const userId=req.params.id;
        const user=await User.findById(userId).populate({path:'posts',options:{sort:{createdAt:-1}}}).find({path:'bookmarks',options:{sort:{createdAt:-1}}});

        if(!user){
            return res.status(404).json({message:"User not found",
                success:false
            });
        }
        return res.status(200).json({
            user:user,
            success:true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error",
            success:false
        });
        
    }

}

export const editProfile=async (req,res)=>{
    try{
        const userId=req.id;
        const {bio,gender}=req.body;
        const profilePicture=req.file;
        let cloudResponse;
        if(profilePicture){
            const fileUri=getDataUri(profilePicture);
            cloudResponse= await cloudinary.uploader.upload(fileUri)
        }
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found",
                success:false
            });
        }
        if(bio){
            user.bio=bio;
        }
        if(gender){
            user.gender=gender; 
           }
        if(profilePicture){
            user.profilePicture=cloudResponse.secure_url;
        
        }
        user.save();
        return res.status(200).json({message:"Profile updated successfully",
            success:true,
            user
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error",
            success:false
        });
    }
}

export const getSuggestedUsers=async(req,res)=>{
    try{
        const suggestedUser=await User.find({_id:{$ne:req.id}}).select('-password');
        if(!suggestedUser){
            return res.status(404).json({message:"No users found",
                success:false
            });
        }
        return res.status(200).json({suggestedUser,
            success:true
        }); 



    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error",
            success:false
        });
    }
}

export const followOrUnfollowUser=async(req,res)=>{

    try {
        
        const reqSender=req.id;
        const reqReciever=req.params.id;
        if(reqSender===reqReciever){
            return res.status(400).json({message:"You cannot follow yourself",
                success:false
            });
        }
        const reqSenderUser=await User.findById(reqSender);
        const reqRecieverUser=await User.findById(reqReciever);
        if(!reqSenderUser||!reqRecieverUser){
            return res.status(404).json({message:"User not found",
                success:false
            });
        }
        const isFollowing=reqSenderUser.following.includes(reqReciever);
        if(isFollowing){
            //Already following so unfollow
            await Promise.all([
                User.upadateOne({_id:reqSender},{$pull:{following:reqReciever}}),
                User.updateOne({_id:reqReciever},{$pull:{followers:reqSender}})
            ]);
            return res.status(200).json({message:"Unfollowed successfully",
                success:true
            });
        }else{
            await Promise.all([
                User.upadateOne({_id:reqSender},{$push:{following:reqReciever}}),
                User.updateOne({_id:reqReciever},{$push:{followers:reqSender}})
            ]);
            return res.status(200).json({message:"Followed successfully",
                success:true    
            });

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error",
            success:false   
        });
    }
}