const mongoose = require("mongoose");

const userScema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "with this email user account already exists"]
  },
  password: String,
});

const userModel = mongoose.model("users", userScema);

module.exports = userModel;
