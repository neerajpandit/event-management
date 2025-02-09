import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    refreshAccessToken
   
} from "../controllers/user.controller.js";
import upload from "../utils/multer.js";
// import { u } from "../middlewares/inputvalidation.middleware.js";

const router = Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";

//Admin Related
router.route("/signup").post(upload.single("profile"), registerUser);
router.route("/signup").post( registerUser);
router.route("/signin").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);


export default router;
