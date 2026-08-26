const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists with this email or username",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user register successfully",
    user,
  });
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");
  if (!user) {
    return res.status(400).json({
      message: "Invalid credential",
    });
  }

  const isPasswordvalid = await bcrypt.compare(password, user.password);
  if (!isPasswordvalid) {
    return res.status(400).json({
      message: "Invalid credential",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user login successfully",
    user:{
      username:user.username,
      email:user.email
    },
  });
};

const getMe = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    message: "user fetched",
    user,
  });
};

const logoutUser = async (req, res) => {
  const token = req.cookies.token;

  res.clearCookie("token");

  await redis.set(token, Date.now().toString(), "EX", 60 * 60);

  res.status(200).json({
    message: "User logout successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
};
