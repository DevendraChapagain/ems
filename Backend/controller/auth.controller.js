import User from "../models/user.model.js";

export async function Register (req, res) {
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

    //Create new user
    const newUser = await User.create({ name, email, password });
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error registering user",
    });
  }
}

export default Register;
