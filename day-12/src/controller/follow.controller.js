const { resource } = require("../app");
const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

const followController = async (req, res) => {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "you can't follow your self",
    });
  }

  const isUserAlreadyFollow = await followModel.findOne({
    followee: followeeUsername,
    follower: followerUsername,
  });
  if (isUserAlreadyFollow) {
    return res.status(200).json({
      message: "you are already following this user",
    });
  }

  const isUserExist = await userModel.findOne({ followee: followeeUsername });
  if (!isUserExist) {
    return res.status(404).json({
      message: "this user is not available",
    });
  }

  const followRecord = await followModel.create({
    followee: followeeUsername,
    follower: followerUsername,
  });

  res.status(200).json({
    message: `now you are following this user ${followeeUsername}`,
    follow,
  });
};

const UnfollowController = async (req, res) => {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername == followeeUsername) {
    return res.status(401).json({ message: "you can't unfollow yourself" });
  }

  const isUserFollow = await followModel.findOne({
    followee: followeeUsername,
    follower: followerUsername,
  });
  if (!isUserFollow) {
    return res.status(401).json({ message: "user is not follow" });
  }

  const followRecord = await followModel.findByIdAndDelete(isUserFollow._id);
  res.status(200).json({ message: "unfollow successfully" });
};

module.exports = {
  followController,
  UnfollowController,
};
