import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },

        description: {
            type: String,
            required: [true, "Description is required"],
        },

        assignedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Task must by admin"],
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Task must be assigned to a user"],
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low",
        },

        status: {
            type: String,
            enum: ["pending", "in_progress", "completed"],
            default: "pending",
        },

        dueDate: {
            type: Date,
            required: [true, "Due Date is required"],
        },
    },
    {
        timestamps: true,
    },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;