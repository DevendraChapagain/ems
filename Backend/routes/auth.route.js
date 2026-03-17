import { Router } from "express";
import * as authController from "../controller/auth.controller.js"

const authRouter = Router();

authRouter.post("/register",authController.Register);


export default authRouter;