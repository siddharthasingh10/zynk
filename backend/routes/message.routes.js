import express from "express";
 import { userAuth } from "../middlewares/user.auth.js";
// import upload from "../middlewares/multer.js";
import {getMessage , sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route('/send/:id').post(userAuth, sendMessage);
router.route('/all/:id').get(userAuth, getMessage);
 
export default router; 