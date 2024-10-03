import express from "express";
import { signin, signUp } from "../controller/user";

const router = express.Router();

router.post("/auth/signup", signUp);

router.post("/auth/signin", signin);

export default router;
