import User from "../models/user.model.js";
import crypto from "crypto";

function hashPassword(password) {
  // Uses SHA-256 algorithm to create a secure, fixed-length hash string
  return crypto.createHash("sha256").update(password).digest("hex");
}


// CREATE USER (Admin / HR only)
// ─────────────────────────────────────────────

export async function createUser(req, res) {
  try {
    const { name, email, password, role, department } = req.body;

    // validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // security rule: only admin can create admin
    if (role === "admin" && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can create admin users",
      });
    }

    const hashedPassword = hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      department,
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Create user error:", error);
    return res.status(500).json({
      message: "Error creating user",
    });
  }
}


// GET ALL USERS (Admin / HR)
// ─────────────────────────────────────────────

export async function getUsers(req, res) {
  try {
    const { role, page = 1, limit = 10 } = req.query;

    const filter = role ? { role } : {};

    const users = await User.find(filter)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Users retrieved successfully",
      total: users.length,
      users,
    });

  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({
      message: "Error fetching users",
    });
  }
}


// GET SINGLE USER
// ─────────────────────────────────────────────

export async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      user,
    });

  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({
      message: "Error fetching user",
    });
  }
}


// UPDATE USER
// ─────────────────────────────────────────────

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, role, department } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // prevent non-admin from changing role to admin
    if (role === "admin" && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can assign admin role",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        role,
        department,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({
      message: "Error updating user",
    });
  }
}


// ─────────────────────────────────────────────
// DELETE USER
// ─────────────────────────────────────────────

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({
      message: "Error deleting user",
    });
  }
}