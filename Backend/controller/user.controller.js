import User from "../models/user.model.js";

export async function getUsers(req, res) {
  try {
    const users = await User.find()
      .select("-password")  
      .sort({ createdAt: -1 });

    return res.status(200).json({
      total: users.length,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({ message: "Error fetching users" });
  }
}