const express = require("express");
const followRouter = express.Router();
const identifyUser = require("../middlewear/auth.middlewear");
const folloController = require("../controller/follow.controller");

followRouter.post("/follow/:username", identifyUser, folloController.followController);

followRouter.post("/unfollow/:username", identifyUser, folloController.UnfollowController);

module.exports = followRouter;
