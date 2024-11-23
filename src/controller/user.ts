import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserDataSchema from "../model/user";
// import { IUser } from "../model/user";

// get user by id
export const getuserByid = async (req: Request, res: Response) => {
  try {
    const user = await UserDataSchema.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in fetching data" });
    // res.redirect("/user/login");
  }
};

//
export const newUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    // console.log(username, email, password);
    // all credentials true
    if (!(username && email && password)) {
      res.status(400).json("Email and username are required.");

      return;
    }
    // check alredy
    const existing = await UserDataSchema.findOne({
      email: email,
      username: username,
    });
    if (existing) {
      res.status(403).json({ error: "email or username alredy used " });
      return;
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

    const token = jwt.sign({ id: user.id, email: email }, "jwtSecret");
    // set cookies as
    res.cookie("user", token);
    console.log(token);
    // res
    //   .status(200)
    //   .json({ message: "account created successfully", user: user });
    res.status(200).json({ message: "account created successfully", user });
    // /info/${User._id}
    // res.status(200).redirect(`/user/info/${user._id}`);
    // res.json(token);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in saving data" });
  }
};

// User login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      res.status(403).json({ error: "invalid credentials" });
    }
    const User: any = await UserDataSchema.findOne({ email });
    // check
    if (!User) {
      res.status(403).json({ error: "invalid credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(password, User.password);
    if (!isPasswordMatch) {
      res.status(403).json({ error: "invalid password" });
      return;
    }

    const token = jwt.sign({ id: User._id, email: User.email }, "jwtSecret", {
      expiresIn: "1h",
    });
    // cookies stored
    res.cookie("user", token);

    console.log("this is cookies ", req.cookies.user);
    // res.json(token);

    res.status(200).json({ mes: "user login success", User });
    // res.status(200).redirect(`/user/info/${User._id}`);
  } catch (err) {
    console.log("login errr", err);
    res.status(500).json({ message: "Error in login" });
  }
};

// User logout
export const logoutUser = (req: Request, res: Response) => {
  console.log("working logout");

  try {
    // console.log("this is user data", (req as any).user);

    res.clearCookie("user");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("logout error");
    res.status(404).json({ message: "something went wrong" });
  }
};
