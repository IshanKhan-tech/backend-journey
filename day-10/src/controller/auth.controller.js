const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { username, email, password, bio, profile_image } = req.body;
  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExist) {
    return res.status(409).json({
      message:
        isUserExist.email == email
          ? "email already exist"
          : "username already exist",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profile_image,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token);
  res.status(200).json({ message: "user registered successfully",user });
};

const loginController = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    return res.status(404).json({ message: "user Not Found" });
  }
  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token);
  res.status(200).json({ message: "login successfully" });
};

module.exports = {
  registerController,
  loginController,
};
