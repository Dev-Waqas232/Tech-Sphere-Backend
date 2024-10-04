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

    const token = generateToken(user._id.toString(), user.isAdmin);
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

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Invalid Credentials", ok: false });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch)
      return res
        .status(404)
        .json({ message: "Invalid Credentials", ok: false });

    const token = generateToken(user._id.toString(), user.isAdmin);

    res.status(200).json({
      message: "Sign in successfull",
      ok: true,
      data: { token, user },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};

export { signUp, signin };
