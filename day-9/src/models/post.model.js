const mongoose = require("mongoose");

const postScema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  img_url: {
    type: String,
    require: [true, "img is required"],
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: [true, "user id is required"],
  },
});

const postModel = mongoose.model("post", postScema);

module.exports = postModel;
