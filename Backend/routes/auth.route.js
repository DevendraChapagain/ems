import { Router } from "express";
import * as authController from "../controller/auth.controller.js"

const authRouter = Router();

//Post /api/auth/register
authRouter.post("/register",authController.Register);

//Get /api/auth/login
authRouter.get("/login",authController.Login);


export default authRouter;