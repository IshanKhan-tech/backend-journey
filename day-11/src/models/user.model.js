const mongoose = require("mongoose");

const userScema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exists"],
    require: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "username already exists"],
    require: [true, "username is required"],
  },
  password: {
    type: String,
    require: [true, "username is required"],
  },
  bio: String,
  profile_image: {
    type: String,
    default:
      "https://ik.imagekit.io/flhcpraro/test_bvTUk_e4_?updatedAt=1784384306107",
  },
});

const userModel = mongoose.model("users", userScema);
module.exports = userModel;