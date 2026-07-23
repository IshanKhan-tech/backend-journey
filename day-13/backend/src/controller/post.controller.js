const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const likeModel = require("../models/like.model");

const imagekit = Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {
  console.log(req.body, req.file);

  const userId = req.user.id;

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    image: file.url,
    user: userId,
  });

  res.status(200).json({ message: "post created successfully", post });
};

const getController = async (req, res) => {
  const userId = req.user.id;
  const post = await postModel.find({ user: userId });
  res.status(200).json({ message: "post fetched successfully", post });
};

const getPostDetailsController = async (req, res) => {
  console.log(req.params.id);

  const userId = req.user.id;
  const postId = req.params.id;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "Post does not found" });
  }

  const isUserValid = post.user.toString() === userId;
  if (!isUserValid) {
    return res.status(403).json({ message: "Forbitten content" });
  }
  res.status(200).json({ message: "detail fetched", post });
};

const deletePostController = async (req, res) => {
  const userId = req.user.id;

  const postId = req.params.id;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  const isUserValid = post.user.toString() === userId;
  if (!isUserValid) {
    return res.status(403).json({ message: "Forbidden Content." });
  }

  await postModel.findByIdAndDelete(postId);
  res.status(200).json({ message: "post deleted successfully" });
};

const likePostController = async (req, res) => {
  const username = req.user.username;
  const postId = req.params.id;

  const isPostExist = await postModel.findById(postId);
  if (!isPostExist) {
    return res.status(404).json({ message: "post not found" });
  }

  const isPostAlreadyLiked = await likeModel.findOne({
    postId: isPostExist._id,
    username: username,
  });
  if (isPostAlreadyLiked) {
    return res.status(200).json({ message: "post already liked " });
  }

  const likeRecord = await likeModel.create({
    postId: isPostExist._id,
    username: username,
  });

  res.status(200).json({
    message: "post liked successfully",
  });
};

const unlikePostController = async (req, res) => {
  const postId = req.params.id;
  const username = req.user.username;

  const isPostExist = await postModel.findById(postId);
  if (!isPostExist) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const isPostLiked = await likeModel.findOne({
    postId: isPostExist._id,
    username: username,
  });
  if (!isPostLiked) {
    return res.status(401).json({
      message: "post not liked",
    });
  }

  await likeModel.findByIdAndDelete(isPostLiked._id)
  res.status(200).json({message:"post unliked"})
};

module.exports = {
  createPostController,
  getController,
  getPostDetailsController,
  deletePostController,
  likePostController,
  unlikePostController
};
