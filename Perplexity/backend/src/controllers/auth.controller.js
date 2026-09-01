import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { createVerificationLink } from "../services/mail.service.js";
import { createFirebaseUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExists) {
    return res.status(400).json({
      message: "Username or email already exists",
      success: false,
      err: "Username or email already exists",
    });
  }

  const firebaseUser = await createFirebaseUser({
    email,
    password,
  });

  const user = await userModel.create({ username, email, password });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });

  const verifyLink = await createVerificationLink(user.email);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    verifyLink,
  });
};
