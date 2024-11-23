import express, { NextFunction, Request, Response } from "express";
import UserDataSchema from "../model/user";
import jwt from "jsonwebtoken";
interface CustomRequest extends Request {
  user?: any;
}
interface JwtPayload {
  id: string;
  email: string;
}

export const verifyAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.user;

  if (!token) {
    res.status(403).json({ message: "Access Denied, No Token Provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, "jwtSecret") as { id: string };
    const user = await UserDataSchema.findById(decoded.id);

    if (!user) {
      res.status(403).json({ message: "Access Denied, Not Admin" });
      return;
    }

    if (!(user.role == "Admin")) {
      res.status(403).json({ message: "Access Denied, Not Admin" });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to authenticate token" });
    return;
  }
};
