const postModel = require("../models/post.model");
const imageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const ImageKit = new imageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const createPost = async (req, res) => {
  console.log(req.body, req.file);
  const file =await ImageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
  });
  res.send(file);
};

module.exports = {
  createPost,
};
