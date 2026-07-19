const express = require("express");
const postRouter = express.Router();
const multer  = require("multer")
const update = multer({Storage:multer.memoryStorage()})
const postController= require("../controller/post.controller")

postRouter.post("/",update.single("image"), postController.createPostController);
postRouter.get("/", postController.getController);
postRouter.get("/:id", postController.getPostDetailsController);

module.exports = postRouter;
