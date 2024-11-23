import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface extenedRequest extends Request {
  user?: any;
}
interface JwtPayload {
  id: string;
  email: string;
}

export const verifyToken = (
  req: extenedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.user;

    console.log("cookies middleware", req.cookies.user);
    if (!token) {
      res.status(401).json({ error: "No token provided " });
      return;
    }
    const decoded = jwt.verify(token, "jwtSecret");
    if (!decoded) {
      res.json("verify failed");
      return;
    }
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
