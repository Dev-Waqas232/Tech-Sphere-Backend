import express from "express";
import { signUp } from "../controller/user";

const router = express.Router();

router.post("/auth/signup", signUp);

export default router;
