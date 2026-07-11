const mongoose = require("mongoose");

const noteScema = mongoose.Schema({
  title: String,
  description: String,
});

const noteModel = mongoose.model("notes", noteScema);

module.exports = noteModel;
