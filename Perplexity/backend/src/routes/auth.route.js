import { Router } from "express";
import { register, verifyEmail, login, getMe } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = Router();

router.post("/register", registerValidator, register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

export default router;
