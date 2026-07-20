const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const update = multer({ Storage: multer.memoryStorage() });
const identifyUserMiddlewear = require("../middlewears/auth.middlewear");

postRouter.post(
  "/",
  update.single("image"),
  identifyUserMiddlewear,
  postController.postCreateController,
);

postRouter.get("/", identifyUserMiddlewear, postController.getPostController);

postRouter.get("/:id", identifyUserMiddlewear, postController.getPostDetailController);

postRouter.delete("/:id",identifyUserMiddlewear,postController.deletePostController)

module.exports = postRouter;
