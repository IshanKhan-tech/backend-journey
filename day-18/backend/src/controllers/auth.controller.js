const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "user already exists",
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
    message: "User register successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  }).select("+password")
  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid credentials",
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
  res.cookie("token", token)

  res.status(200).json({
    message:"User login successfully"
  })
};

const getMe = async (req,res)=>{
  const user = await userModel.findById(req.user.id)

  res.status(200).json({
    message:"user fetched successfully",
    user
  })

}

const logoutUser = async (req,res)=>{
 const token = req.cookies.token

  res.clearcookie("token")

  await blacklistModel.create({
    token
  })

  res.status(200).json({
    message:"User logout successfully"
  })

}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser
};
