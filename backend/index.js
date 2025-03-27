import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import mongoose from "mongoose";
import postRoutes from "./routes/post.routes.js";
import messageRoutes from "./routes/message.routes.js";
dotenv.config();


const PORT= process.env.PORT || 6000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions={
    origin:"http://localhost:5173",
    credentials:true,
}
app.use(cors(corsOptions));

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/post",postRoutes);
app.use("/api/v1/message",messageRoutes);


connectDB();
app.listen(PORT,async()=>{

    console.log(`Server is running on port ${PORT}`);
    console.log("Registered Models:", mongoose.modelNames());  

})