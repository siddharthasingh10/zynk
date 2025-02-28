const { register, login, logout, getUser, editUser, getSuggestedUser, followOrUnfollowUser } = require("../controllers/user.controller.js");
const { isAuthenticated } = require("../middlewares/auth.js");
import express from "express";
const router = express.Router();

router.post("/register",
    [
        body("username").not().isEmpty().withMessage("Username is required"),
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long")
    ], register);

router.post("/login",
    [
        body("/email").isEmail().withMessage("Enter a valid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long")
    ], login);

router.get("/logout", isAuthenticated, logout);
router.get("/:id/user", isAuthenticated, getUser);
router.put("/profile/edit", isAuthenticated, editUser);
router.get("/suggested", isAuthenticated, getSuggestedUser);
router.post("/:id/followorunfollow", isAuthenticated, followOrUnfollowUser);



export default router;