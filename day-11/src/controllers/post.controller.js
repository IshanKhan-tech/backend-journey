const { toFile } = require("@imagekit/nodejs");
const Imagekit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");

const imageKit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const postCreateController = async (req, res) => {
  console.log(req.body, req.file);

  const userId = req.user.id;

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    image: file.url,
    user: userId,
  });

  res.status(200).json({ message: "post created successfully" });
};

const getPostController = async (req, res) => {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });
  res.status(200).json({ message: "post fetched successfully", posts });
};

const getPostDetailController = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  const isUserValid = post.user.toString() === userId;
  if (!isUserValid) {
    return res.status(403).json({ message: "forbitten content" });
  }

  res.status(200).json({
    message: "post details fetched",
    post,
  });
};

const deletePostController = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  const post = await postModel.findById(postId);
  if(!post){
    return 
  }
};

module.exports = {
  postCreateController,
  getPostController,
  getPostDetailController,
  deletePostController,
};
