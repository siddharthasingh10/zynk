import mongoose from "mongoose";

const postSchema = new mongoose.Schema({  // ✅ Use mongoose.Schema, not mongoose.model
    caption: { type: String, default: "" },
    image: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });

export default mongoose.model("Post", postSchema);  // ✅ Now we use mongoose.model correctly
