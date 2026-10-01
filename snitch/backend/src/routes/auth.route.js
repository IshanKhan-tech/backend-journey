import { Router } from "express";
import { authenticateUser } from "../middlewears/auth.middlewear.js";
import { register, login, getMe } from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

const route = Router();

route.post("/register", registerValidator, register);
route.post("/login", loginValidator, login);
route.get("/getMe", authenticateUser, getMe);

export default route;
