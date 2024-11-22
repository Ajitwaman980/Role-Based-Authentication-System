import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserDataSchema from "../model/user";
import { schemaValidation } from "../middleware/userval";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import { verifyToken } from "../middleware/verifyToken";
const router = express.Router();

router.get("/user/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await UserDataSchema.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    // res.status(500).json({ message: "Error in fetching data" });
    res.redirect("/user/login");
  }
});

// creted the user using jwt authentication
router.post(
  "/new/user",
  schemaValidation,
  async (req: Request, res: Response) => {
    try {
      const { username, email, password, role } = req.body;
      // console.log(username, email, password);
      // all credentials true
      if (!(username && email && password)) {
        res.status(403).json({ error: "invalid credentials" });
      }
      // check alredy
      const existing = await UserDataSchema.findOne({ email: email });
      if (existing) {
        res.status(403).json({ error: "email already exists" });
      }
      // hash password
      const hashedpassword = await bcrypt.hash(password, 10);

      // data saved in database
      const user = await new UserDataSchema({
        username,
        email,
        password: hashedpassword,
        role,
      });
      // save
      await user.save();
      // jwt auth
      const token = await jwt.sign({ id: user.id, email: email }, "jwtsecret");
      // set cookies as
      res.cookie("user", token);
      // res.status(200).json({ message: "account created successfully" });

      res.status(200).redirect(`/user/${user._id}`);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error in saving data" });
    }
  }
);
// login router
router.post(
  "/user/login",

  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      if (!(email && password)) {
        res.status(403).json({ error: "invalid credentials" });
      }
      const User = await UserDataSchema.findOne({ email });
      // check
      if (!User) {
        res.status(403).json({ error: "invalid credentials" });
      } else {
        const isPasswordMatch = await bcrypt.compare(password, User.password);
        if (!isPasswordMatch) {
          res.status(403).json({ error: "invalid password" });
          return;
        }
        const token = jwt.sign(
          { id: User._id, email: User.email },
          "jwtsecret",
          {
            expiresIn: "1h",
          }
        );
        // console.log(token);
        // res.setHeader("authorization", `Bearer ${token}`);
        // res.setHeader("Authorization", token);
        res.cookie("user", token);

        res.status(200).redirect(`/user/${User._id}`);
      }
    } catch (err) {
      console.log("login errr", err);
      res.status(500).json({ message: "Error in login" });
    }
  }
);
// logout
router.get("/user/logout", verifyToken, (req: Request, res: Response) => {
  console.log("Logout Called");
  res.clearCookie("user");
  console.log("cookies Cleared");
  res.status(200).json({ message: "Logged out successfully" });
  // try {
  //   // console.log("this is user data", (req as any).user);
  //   res.clearCookie("user");
  //   res.status(200).json({ message: "Logged out successfully" });
  // } catch (err) {
  //   console.log("logout error", err);
  //   res.status(404).json({ message: "something went wrong" });
  // }
});

// admin
router.get(
  "/admin/dashboard",
  verifyToken,

  async (req: Request, res: Response) => {
    try {
      const users = await UserDataSchema.find();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error fetching users" });
    }
  }
);
export default router;
