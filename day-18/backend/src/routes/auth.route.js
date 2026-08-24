const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddlewear = require("../middlewears/auth.middlewear");

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

router.get("/getme", authMiddlewear, authController.getMe);
router.get("/logout", authMiddlewear, authController.logoutUser);

module.exports = router;
