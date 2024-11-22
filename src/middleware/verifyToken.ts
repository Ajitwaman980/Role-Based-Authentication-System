import express, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserDataSchema from "../model/user";

interface extenedRequest extends Request {
  user?: any;
  id?: string;
}

export const verifyToken = (
  req: extenedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.user;
    // const token = req.headers.authorization?.split(" ")[0];
    console.log("this is middleware token ", token);
    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, "jwtsecret");
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
// export const verifyAdmin = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.cookies.user || req.headers.authorization;

//   if (!token) {
//     res.status(403).json({ message: "Access Denied, No Token Provided" });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, "jwtsecret");
//     const user = await UserDataSchema.findById(decoded);

//     if (!user || user.role !== "admin") {
//       res.status(403).json({ message: "Access Denied, Not Admin" });
//       return;
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to authenticate token" });
//     return;
//   }
// };
