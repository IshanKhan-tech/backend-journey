import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { verifyFirebaseToken } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, idToken } = req.body;

    const firebaseUser = await verifyFirebaseToken(idToken);

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

    const user = await userModel.create({
      username,
      email,
      password,
      firebaseUid: firebaseUser.uid,
      verified: false,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Registration failed",
      success: false,
      err: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { idToken } = req.body;

    const firebaseUser = await verifyFirebaseToken(idToken);

    if (!firebaseUser.email_verified) {
      return res.status(400).json({
        message: "Email is not verified",
        success: false,
      });
    }

    const user = await userModel.findOneAndUpdate(
      { firebaseUid: firebaseUser.uid },
      { verified: true },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Verification failed",
      success: false,
      err: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { idToken } = req.body;

    const firebaseUser = await verifyFirebaseToken(idToken);

    if (!firebaseUser.email_verified) {
      return res.status(403).json({
        message: "Email is not verified",
        success: false,
      });
    }

    const user = await userModel.findOne({
      firebaseUid: firebaseUser.uid,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Email is not verified",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Login failed",
      success: false,
      err: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch user details",
      success: false,
      err: error.message,
    });
  }
};
