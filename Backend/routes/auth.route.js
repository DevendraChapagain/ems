import { Router } from "express";
import * as authController from "../controller/auth.controller.js"

const authRouter = Router();

// POST /api/auth/register
authRouter.post("/register", authController.Register);

// POST /api/auth/login
authRouter.post("/login", authController.Login);

export default authRouter;