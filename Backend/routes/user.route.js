import express from "express";
import { getUsers } from "../controller/user.controller.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/", verifyToken, authorizeRoles("admin", "manager"), getUsers);

export default userRouter;