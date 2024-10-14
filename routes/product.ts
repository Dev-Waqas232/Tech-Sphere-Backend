import express from "express";
import multer from "multer";

import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { createProduct, getProducts } from "../controller/product";

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post(
  "/create",
  authenticate,
  authorize,
  upload.single("image"),
  createProduct
);

router.get("/", authenticate, authorize, getProducts);

export default router;
