import userAPi from "./user";
import adminApi from "./admin";
import UserDataSchema from "../model/user";
import { schemaValidation } from "../middleware/userval";
import { getuserByid } from "../controller/user";
import { newUser } from "../controller/user";
import { loginUser } from "../controller/user";
import { logoutUser } from "../controller/user";
import { verifyToken } from "../middleware/verifyToken";
import { verifyAdmin } from "../middleware/admin";
export {
  userAPi,
  adminApi,
  UserDataSchema,
  schemaValidation,
  getuserByid,
  newUser,
  loginUser,
  logoutUser,
  verifyToken,
  verifyAdmin,
};
