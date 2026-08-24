const mongoose = require("mongoose");

const userScema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "username is required"],
    unique: [true, "username must be unique"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    select:false
  },
});

const userModel = mongoose.model("users", userScema);

module.exports = userModel;
