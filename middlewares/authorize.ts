import { Request, Response, NextFunction } from "express";
import { decodeAdmin, verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      isAdmin: boolean;
    }
  }
}

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];
    if (!header)
      return res.status(401).json({ message: "Unauthorized", ok: false });
    const token = header.split(" ")[1];
    const isAdmin = decodeAdmin(token);
    if (!isAdmin)
      return res.status(401).json({ message: "Unauthorized", ok: false });
    req.isAdmin = isAdmin;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};
