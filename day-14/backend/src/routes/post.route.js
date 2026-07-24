const express = require("express");
const postRouter = express.Router();
const multer = require("multer");
const update = multer({ Storage: multer.memoryStorage() });
const postController = require("../controller/post.controller");
const identifyUser = require("../middlewear/auth.middlewear");

postRouter.post(
  "/",identifyUser,
  update.single("image"),
  postController.createPostController,
);
postRouter.get("/",identifyUser, postController.getController);
postRouter.get("/:id",identifyUser, postController.getPostDetailsController);
postRouter.delete("/:id",identifyUser, postController.deletePostController);

postRouter.post("/like/:id",identifyUser, postController.likePostController);
postRouter.post("/unlike/:id",identifyUser, postController.unlikePostController);

module.exports = postRouter;
