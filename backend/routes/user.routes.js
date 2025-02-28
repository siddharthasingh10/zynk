import express from "express";
import { body } from "express-validator";
import upload from "../middlewares/multer.js";
import { 
    register, login, logout, getUser, editProfile, 
    getSuggestedUsers, followOrUnfollowUser 
} from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/user.auth.js";

const router = express.Router();

router.post("/register",
    [
        body("username").not().isEmpty().withMessage("Username is required"),
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    ], register);

router.post("/login",
    [
        body("email").isEmail().withMessage("Enter a valid email"), 
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    ], login);

router.get("/logout", userAuth, logout);
router.get("/:id/profile", userAuth, getUser);
router.put("/profile/edit", userAuth,upload.single('profilePhoto'), editProfile);
router.get("/suggested", userAuth, getSuggestedUsers);
router.post("/:id/followorunfollow", userAuth, followOrUnfollowUser);

export default router;
