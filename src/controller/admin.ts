import { Request, Response } from "express";
import UserDataSchema from "../model/user";
import { createClient } from "redis";

const redisconnections = createClient({
  url: "redis://localhost:6379",
});
redisconnections
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log("Error connecting");
  });

export const getUsers = async (req: Request, res: Response) => {
  try {
    const cachedata = await redisconnections.get("Redisuserskey");
    if (cachedata) {
      console.log("Data fetched from Redis");
      res.json(JSON.parse(cachedata));
      return;
    }
    const users = await UserDataSchema.find();
    await redisconnections.setEx("Redisuserskey", 60, JSON.stringify(users));
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await redisconnections.del("Redisuserskey");
    const updatedUser = await UserDataSchema.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await redisconnections.del("Redisuserskey");
  try {
    const deletedUser = await UserDataSchema.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
};
