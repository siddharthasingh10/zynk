// import { Conversation } from '../models/conversation.model.js';
// import { Message } from '../models/message.model.js';
// import { getRecieverSocketId, io } from '../socket/socket.js';
// export const sendMessage = async (req, res) => {
//     try {

//         const senderId = req.id;
//         const receiverId = req.params.id;
//         const { text } = req.body;
//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] }
//         });
//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId]
//             });
//         }
//         const newMessage = await Message.create({
//             senderId,
//             receiverId,
//             message: text
//         });
//         if (newMessage) {           
//             conversation.messages.push(newMessage._id); 

//         }
//         await Promise.all([newMessage.save(), conversation.save()]);

//         // implement socket io here
//         const recieverSocketId = getRecieverSocketId(receiverId);
//         if (recieverSocketId) {
//             io.to(recieverSocketId).emit('newMessage', newMessage);
//         }
//         console.log("Emitting newMessage to:", recieverSocketId);


//         return res.status(201).json({  
//             message: "Message sent",
//             success: true,
//             newMessage
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             success: false,
//             error: error.message
//         });
//     }
// }

// export const getMessage = async (req, res) => {
//     try {
//         const senderId = req.id;
//         const receiverId = req.params.id;
//         const conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] }
//         }).populate('messages');
//         if (!conversation) {
//             return res.status(200).json({
//                 messages: [],
//                 success: true
//             })
//         }
//         return res.status(200).json({
//             messages: conversation?.messages,
//             success: true
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             success: false,
//             error: error.message
//         });
//     }
// }
          

import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { textMessage: message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    // Real-time emit to receiver
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log("Send Message Error:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({ success: true, messages: [] });
    }

    return res.status(200).json({
      success: true,
      messages: conversation.messages,
    });
  } catch (error) {
    console.log("Get Message Error:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};
