import Task from "../models/task.model.js";

// Create Task — admin & manager only
export async function createTask(req, res) {
  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;

    // Validate required fields
    if (!title || !assignedTo || !dueDate) {
      return res.status(400).json({
        message: "Title, assignedTo and dueDate are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedBy: req.user._id,  
      priority,
      dueDate,
    });

    const populated = await task.populate([
      { path: "assignedTo", select: "name email role" },
      { path: "assignedBy", select: "name email" },
    ]);

    return res.status(201).json({
      message: "Task created successfully",
      task: populated,
    });
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({ message: "Error creating task" });
  }
}

// Get Tasks — role based
// admin/manager → all tasks
// employee      → only their own tasks
export async function getTasks(req, res) {
  try {
    let tasks;

    if (req.user.role === "admin" || req.user.role === "manager") {
      // admin and manager see all tasks
      tasks = await Task.find()
        .populate("assignedTo", "name email role")
        .populate("assignedBy", "name email")
        .sort({ createdAt: -1 });
    } else {
      // employee sees only their own tasks
      tasks = await Task.find({ assignedTo: req.user._id })
        .populate("assignedBy", "name email")
        .sort({ createdAt: -1 });
    }

    return res.status(200).json({
      total: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    return res.status(500).json({ message: "Error fetching tasks" });
  }
}

// Update Task — role based
// employee      → can only update STATUS of their own task
// admin/manager → can update everything on any task
export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate, status } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role === "employee") {
      // employee can only update their own task status
      if (task.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          message: "Access denied. This task is not assigned to you.",
        });
      }
      // only allow status update
      task.status = status || task.status;

    } else {
      // admin and manager can update all fields
      task.title       = title       || task.title;
      task.description = description || task.description;
      task.priority    = priority    || task.priority;
      task.dueDate     = dueDate     || task.dueDate;
      task.status      = status      || task.status;
    }

    await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update task error:", error);
    return res.status(500).json({ message: "Error updating task" });
  }
}

// Delete Task — admin & manager only
export async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({ message: "Error deleting task" });
  }
}