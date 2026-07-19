const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const imagekit = Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {
  console.log(req.body, req.file);

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    image: file.url,
    user: decode.id,
  });

  res.status(200).json({ message: "post created successfully", post });
};

const getController = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unautherized access",
    });
  }
  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Unautherized access",
    });
  }
  const userId = decode.id;
  const post = await postModel.find({ user: userId });
  res.status(200).json({ message: "post fetched successfully", post });
};

const getPostDetailsController = async (req, res) => {
  console.log(req.params.id);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthrized access" });
  }
  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Unauthrized access" });
  }
  const userId = decode.id;
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
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unautherized access" });
  }
  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Unautherized access" });
  }
  const userId = decode.id;

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

module.exports = {
  createPostController,
  getController,
  getPostDetailsController,
  deletePostController,
};
