import mongoose, { models } from "mongoose";

// Connect to MongoDB
// interface
export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  role: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      default: "Employee",
      enum: ["Admin", "Manager", "Employee"],
    },
  },
  { timestamps: true }
);
const UserDataSchema = mongoose.model("User", userSchema);
export default UserDataSchema;
