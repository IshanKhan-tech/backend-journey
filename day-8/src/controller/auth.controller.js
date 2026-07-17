
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { username, email, password, bio, profile_image } = req.body;
  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExists) {
    return res.status(409).json({
      message:
        isUserExists.email == email
          ? "email already exists"
          : "username already exists",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

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
  res.status(200).json({
    message: "user registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_image: user.profile_image,
    },
  });
}


const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or:[
        {
            username:username
        },
        {
            email:email
        }
    ]
  });
  if (!user) {
    return res
      .status(404)
      .json({
        message: 
        'user not found'
      });
  }
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isPasswordValid = hash == user.password;
  if (!isPasswordValid) {
    return res.status(404).json({ message: "Invalid Password" });
  }
  const token = jwt.sign(
    {id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  )
  res.cookie("token",token)
  res.status(200).json({message:"user logedIn successfully"})
}
module.exports= {registerController,loginController}