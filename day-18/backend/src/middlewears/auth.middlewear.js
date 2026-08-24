const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "token not provided",
    });
  }

  const isUserBlacklisted = await blacklistModel.findOne({token})
  if(isUserBlacklisted){
    return res.status(401).json({
      message:"Invalid token"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = authUser;
