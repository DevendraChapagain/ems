import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function Register(req, res) {
  try {
    const { name, email, password } = req.body;

    //Check if user already exists
    const isAlreadyExist = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (isAlreadyExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = crypto
      .createHash("Sha256")
      .update(password)
      .digest("hex");

    //Create new user
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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      accessToken: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error registering user",
    });
  }
}

export async function Login(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Token Not Found",
    });
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
  const user = await User.findById(decoded.id);
  res.status(200).json({
    message: "User Data Fetched Successfully",
    user: {
      username: user.name,
      email: user.email,
    },
  });
}

export default Register;
