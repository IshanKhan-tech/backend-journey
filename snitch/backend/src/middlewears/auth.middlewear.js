import { config } from "../config/config";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authenticateSeller = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unautherized access" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthrized access" });
    }

    const user = userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthrized access" });
    }

    if (user.seller !== "seller") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unautherized access" });
  }
};
