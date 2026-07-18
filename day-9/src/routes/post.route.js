const express = require("express");
const postRouter = express.Router();
const postController = require("../controller/post.controller");
const multer = require("multer")
const update = multer({storage:multer.memoryStorage()})

postRouter.post("/",update.single("image"), postController.createPost);

module.exports = postRouter;
