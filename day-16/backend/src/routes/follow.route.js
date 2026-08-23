const express = require("express");
const followRouter = express.Router();
const identifyUser = require("../middlewear/auth.middlewear");
const folloController = require("../controller/follow.controller");

followRouter.post("/follow/:username", identifyUser, folloController.followController);

followRouter.post("/unfollow/:username", identifyUser, folloController.UnfollowController);

followRouter.get("/request", identifyUser, folloController.fetchFollowRequests);

followRouter.patch("/request/accept/:id", identifyUser, folloController.acceptfollowRequest);

followRouter.patch("/request/reject/:id", identifyUser, folloController.rejectFollowRequest);

module.exports = followRouter;
