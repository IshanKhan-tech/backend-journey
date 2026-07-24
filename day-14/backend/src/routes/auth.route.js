const express = require("express");
const authRouter = express.Router();
const authController = require('../controller/auth.controller')
const identifyUser = require('../middlewear/auth.middlewear')


authRouter.post("/register",authController.registerController);
authRouter.post("/login",authController.loginController);
authRouter.get("/getMe", identifyUser, authController.getMe)

module.exports = authRouter;
