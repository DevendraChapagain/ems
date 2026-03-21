import { Router } from "express";
import * as authController from "../controller/auth.controller.js"
import { verifyToken,authorizeRoles } from "../middleware/auth.middleware.js";

const authRouter = Router();

// POST /api/auth/register
authRouter.post("/register", authController.Register);

// POST /api/auth/login
authRouter.post("/login", authController.Login);

// POST /api/auth/refresh-token
authRouter.post("/refresh-token", authController.refreshToken);

// POST /api/auth/logout
authRouter.post("/logout", authController.Logout);


// Admin Route
authRouter.get("/admin",verifyToken,authorizeRoles("admin"),
(req,res)=>{
    res.json({
        message:"Welcome Admin"
    });
})

export default authRouter;