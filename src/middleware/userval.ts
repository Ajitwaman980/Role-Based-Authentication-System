import joi from "joi";
import express, { Request, Response, NextFunction } from "express";
export const UserVal = joi.object({
  username: joi.string().min(3).max(30).required(),
  password: joi.string().min(8).max(100).required(),
  email: joi.string().email().required(),
  role: joi.string().default("Employee"),
});

export const schemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let result = UserVal.validate(req.body);
  console.log(result);
  if (result.error) {
    console.log(result.error.message);
    res.status(400).json({ message: "validation error " });
    return;
  }
  next();
};
