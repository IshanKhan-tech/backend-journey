const { toFile } = require("@imagekit/nodejs");
const mongoose = require("mongoose");

const likeScema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: [true, "id must be required"],
  },
  username: {
    type: String,
    require: [true, "id must be required"],
  },
});

likeScema.index({ postId: 1, username: 1 }, { unique: true });

const likeModel = mongoose.model("likes", likeScema);

module.exports = likeModel;
