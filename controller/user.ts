import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user";
import { generateToken } from "../utils/jwt";

const signUp = async (req: Request, res: Response) => {
  const { username, email, password, isAdmin } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(409)
        .json({ message: "Email already exists", ok: false });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });

    const token = generateToken(user._id.toString());
    res.status(201).json({
      message: "Sign up Successfull",
      ok: true,
      data: { token, user },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};

export { signUp };
