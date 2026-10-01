import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const sendTokenResponse = async (user, res, message) => {
  const token = await jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET_KEY,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message,
    success: true,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullname: user.fullname,
      role: user.role,
    },
  });
};

export const register = async (req, res) => {
  const { email, contact, password, fullname, isSeller } = req.body;

  try {
    const isUserAllreadyExist = await userModel.findOne({
      $or: [{ email }, { contact }],
    });
    if (isUserAllreadyExist) {
      return res.status(400).json({ message: "User Already Registered" });
    }

    const user = await userModel.create({
      email,
      contact,
      fullname,
      password,
      role: isSeller ? "seller" : "buyer"
    });

    await sendTokenResponse(user, res, "User registered successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "this email not found" });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  await sendTokenResponse(user, res, "User login successfully")
};

export const getMe = async (req,res)=>{
  const user = req.user

  res.status(200).json({
    message:"User fetched successfully",
    success:true,
    user:{
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
  })
}