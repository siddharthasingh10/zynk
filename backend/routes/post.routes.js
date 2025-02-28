import express from "express";
import  { userAuth } from "../middlewares/user.auth.js";
import { getAllPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/getallposts",userAuth,getAllPosts);

export default router;