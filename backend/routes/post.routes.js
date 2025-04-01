import express from "express";
import  { userAuth } from "../middlewares/user.auth.js";
import upload from "../middlewares/multer.js";
import { getAllPosts,createPost,getUserPosts,getCommentsOfPost,likePost,unlikePost
    ,addComments,deletePost, bookmarkPost} from "../controllers/post.controller.js";
 

const router = express.Router();

router.post("/addpost",userAuth, upload.single('image'),createPost);
router.get("/getallposts",userAuth,getAllPosts);
router.get("/userpost/all",userAuth,getUserPosts);

router.get("/:id/like",userAuth,likePost);
router.get("/:id/dislike",userAuth,unlikePost);
router.post("/:id/comment",userAuth,addComments);
router.get("/:id/comment/all",userAuth,getCommentsOfPost);
router.delete("/:id/delete",userAuth,deletePost);
router.post("/:id/bookmark",userAuth,bookmarkPost);
export default router;