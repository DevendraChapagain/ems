import express from "express";
import { createTask,getTasks,updateTask,deleteTask } from "../controller/task.controller.js";
import { verifyToken,authorizeRoles } from "../middleware/auth.middleware.js";

const taskRouter = express.Router();

taskRouter.post ("/", verifyToken,authorizeRoles("admin","manager"),createTask);
taskRouter.get ("/",verifyToken,getTasks);
taskRouter.put ("/:id",verifyToken,updateTask);
taskRouter.delete("/:id",verifyToken,authorizeRoles("admin","manager"),deleteTask);

export default taskRouter;