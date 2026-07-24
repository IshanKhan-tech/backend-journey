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

  const isUserExist = await userModel.findOne({ username: followeeUsername });
  if (!isUserExist) {
    return res.status(404).json({
      message: "this user is not available",
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

  const followRecord = await followModel.create({
    followee: followeeUsername,
    follower: followerUsername,
  });

  res.status(200).json({
    message: `now you are following this user ${followeeUsername}`,
    followRecord,
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

const fetchFollowRequests = async (req, res) => {
  const loginUser = req.user.username;

  const requests = await followModel.find({
    followee: loginUser,
    status: "pending",
  });
  if (requests.length == 0) {
    return res.status(200).json({
      message: "No pending requests",
    });
  }

  res.status(200).json({
    message: "requests are fetched",
    requests,
  });
};

const acceptfollowRequest = async (req, res) => {
  const loginUser = req.user.username;
  const userFolloweeId = req.params.id;

  const isUserFollow = await followModel.findOne({
    _id: userFolloweeId,
    followee: loginUser,
    status: "pending",
  });
  if (!isUserFollow) {
    return res.status(404).json({
      message: "user not following",
    });
  }

  const acceptRequest = await followModel.findOneAndUpdate(
    { _id: isUserFollow._id },
    {
      status: "accepted",
    },
  );
  res.status(200).json({
    message: "follow request accepted",
  });
};

const rejectFollowRequest = async (req, res) => {
  const loginUser = req.user.username;
  const userFolloweeId = req.params.id;

  const isUserFollow = await followModel.findOne({
    _id: userFolloweeId,
    followee: loginUser,
    status:"pending"
  });
  if (!isUserFollow) {
    return res.status(404).json({
      message: "No pending follow request found.",
    });
  }

  const rejectuser = await followModel.findByIdAndUpdate(isUserFollow._id, {
    status: "rejected",
  });
  if(!rejectuser){
    return res.status(400).json({
      message:"something went wrong"
    })
  }

  res.status(200).json({
    message:"user request rejected"
  })
};

module.exports = {
  followController,
  UnfollowController,
  fetchFollowRequests,
  acceptfollowRequest,
  rejectFollowRequest,
};
