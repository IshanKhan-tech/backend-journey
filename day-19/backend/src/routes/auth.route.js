const {Router} = require("express")
const authController = require("../controllers/auth.controller")
const authMiddlewear = require("../middlewears/auth.middlewear")

const route = Router()

route.post("/register", authController.registerUser)
route.post("/login", authController.loginUser)

route.get("/getMe",authMiddlewear, authController.getMe)
route.get("/logout",authMiddlewear, authController.logoutUser)

module.exports = route