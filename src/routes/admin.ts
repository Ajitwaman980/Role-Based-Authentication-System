import express, { Request, Response } from "express";
const router = express.Router();
import { verifyToken, verifyAdmin } from "../middleware/index";

import { getUsers, updateUser, deleteUser } from "../controller/admin";

router.get("/dashboard", verifyToken, verifyAdmin, getUsers);
router.put("/dashboard/update/:id", verifyToken, verifyAdmin, updateUser);
router.delete("/dashboard/delete/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
