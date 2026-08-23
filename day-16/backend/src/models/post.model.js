const mongoose = require("mongoose");

const postScema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    require: [true, "Image is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: [true, "user_ id is required"],
  },
});
const postModel = mongoose.model("post", postScema);
module.exports = postModel;
