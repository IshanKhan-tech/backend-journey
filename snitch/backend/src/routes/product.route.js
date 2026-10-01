import { Router } from "express";
import multer from "multer";
import { authenticateSeller } from "../middlewears/auth.middlewear";
import { createProduct } from "../controllers/product.controller";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const route = Router();

route.post("/", authenticateSeller, upload.array("images", 5), createProduct);

export default route;
