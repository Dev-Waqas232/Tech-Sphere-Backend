import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { createProduct } from "../controller/product";

const router = express.Router();

router.post("/create", authenticate, authorize, createProduct);

export default router;
