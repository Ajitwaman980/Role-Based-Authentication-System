import mongoose from "mongoose";

// Connect to MongoDB
function mongoConnect() {
  mongoose
    .connect("mongodb://localhost/RoleBasedAuthent")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(() => {
      console.log("Failed to connect to MongoDB");
    });
}

export default mongoConnect;
