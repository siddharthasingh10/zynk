import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
username:{type:String, required:true, unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minLength:[6,'Password must be atleast 6 characters long']},
    profilePicture:{type:String,default:''},
    bio:{type:String, default:''},
    gender:{type:String,enum:['male','female']},
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    bookmarks:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}]
},
{timestamps:true});
 export const User=mongoose.model('User',userSchema);