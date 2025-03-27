import {Conversation} from '../models/conversation.model.js';
import { Message } from '../models/message.model.js';
export const sendMessage=async(req,res)=>{
    try {
        const senderId=req.id;
        const receiverId=req.params.id;
        const {text}=req.body;
        let conversation =await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        });
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            });
        }
        const newMessage=await Message.create({
            senderId,
            receiverId,
            text
        });
        if(newMessage){
            conversation.messages.push(newMessaage._id);

        }
        await Promise.all([newMessage.save(),conversation.save()]);
        return res.status(201).json({
            message:"Message sent",
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

export const getMessage=async(req,res)=>{
    try {
        const senderId=req.id;
        const receiverId=req.params.id;
        const conversation =await Conversation.find({
            participants:{$all:[senderId,receiverId]}
        })
        if(!conversation){
            return res.status(200).json({
                messages:[],
                success:true
            })
        }
        return res.status(200).json({
            messages:conversation?.messages,
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