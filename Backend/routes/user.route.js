import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controller/user.controller.js";

import { verifyToken, authorizeRoles } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

// ────────────────────────────────
// CREATE USER (Admin / HR only)
// ────────────────────────────────
userRouter.post("/", verifyToken, authorizeRoles("admin", "hr"), createUser);

// ────────────────────────────────
// GET ALL USERS (Admin / HR only)
// ────────────────────────────────
userRouter.get("/", verifyToken, authorizeRoles("admin", "hr"), getUsers);

// ────────────────────────────────
// GET SINGLE USER
// ────────────────────────────────
userRouter.get("/:id", verifyToken, authorizeRoles("admin", "hr"), getUserById);

// ────────────────────────────────
// UPDATE USER
// ────────────────────────────────
userRouter.put("/:id", verifyToken, authorizeRoles("admin", "hr"), updateUser);

// ────────────────────────────────
// DELETE USER
// ────────────────────────────────
userRouter.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin", "hr"),
    deleteUser,
);

export default userRouter;
