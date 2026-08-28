const mongoose = require("mongoose");

const userScema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username is required"],
    unique: [true, "Username must be unique"],
  },
  email: {
    type: String,
    require: [true, "email is required"],
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    require: [true, "password is required"],
    select: false,
  },
});

const userModel = mongoose.model("users", userScema);

module.exports = userModel;
