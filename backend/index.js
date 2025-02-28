import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
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



app.listen(PORT,async()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})