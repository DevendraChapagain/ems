import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// Register new user
export async function Register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const isAlreadyExist = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (isAlreadyExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Creating Access Token
    const accessToken = jwt.sign({ id: newUser._id }, config.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Creating Refresh Token
    const refreshToken = jwt.sign({ id: newUser._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      accessToken: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error registering user",
    });
  }
}

// Login with email and password
export async function Login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate by Inputs
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by Email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare Hashed password with password input
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Compare passwords
    if (user.password !== hashedPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Creating Access Token
    const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Creating Refresh Token
    const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    // Send response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken: accessToken,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Error during login",
    });
  }
}

export default Register;