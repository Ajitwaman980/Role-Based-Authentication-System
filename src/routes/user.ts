import express from "express";
const router = express.Router();
import { schemaValidation } from "../middleware/userval";

import {
  newUser,
  getuserByid,
  loginUser,
  logoutUser,
} from "../controller/user";

import { verifyToken } from "../middleware/verifyToken";
router.get("/info/:id", verifyToken, getuserByid);

// creted the user using jwt authentication
router.post("/new", schemaValidation, newUser);
// login router
router.post("/login", loginUser);
// logout
router.get("/logout", verifyToken, logoutUser);

// // admin part
// router.get(
//   "/admin/dashboard",
//   verifyToken,
//   verifyAdmin,

//   async (req: Request, res: Response) => {
//     try {
//       const users = await UserDataSchema.find();
//       res.status(200).json(users);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Error fetching users" });
//     }
//   }
// );

// // update data   admin user

// router.put(
//   "/admin/dashboard/update/:id",
//   verifyToken,
//   verifyAdmin,
//   async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//       const updatedUser = await UserDataSchema.findByIdAndUpdate(
//         id,
//         { ...req.body },
//         { new: true }
//       );

//       if (!updatedUser) {
//         res.status(404).json({ message: "User not found" });
//         return;
//       }

//       res.status(200).json({
//         message: "User updated successfully",
//         user: updatedUser,
//       });
//     } catch (err) {
//       console.log("error in updating user ", err);
//       res.status(500).json({ message: "Error updating user" });
//     }
//   }
// );

// router.delete(
//   "/admin/dashboard/delete/:id",
//   verifyToken,
//   verifyAdmin,
//   async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//       const deletedUser = await UserDataSchema.findByIdAndDelete(id);

//       if (!deletedUser) {
//         res.status(404).json({ message: "User not found" });
//         return;
//       }

//       res.status(200).json({
//         message: "User deleted successfully",
//         user: deletedUser,
//       });
//     } catch (err) {
//       console.error("Error deleting user:", err);
//       res.status(500).json({ message: "Error deleting user" });
//     }
//   }
// );

export default router;
