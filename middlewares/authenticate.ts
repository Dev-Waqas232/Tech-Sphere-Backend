import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      isAdmin: boolean;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];
    if (!header)
      return res.status(401).json({ message: "Unauthorized", ok: false });
    const token = header.split(" ")[1];
    const id = verifyToken(token);
    if (!id)
      return res.status(401).json({ message: "Unauthorized", ok: false });
    req.userId = id;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};
