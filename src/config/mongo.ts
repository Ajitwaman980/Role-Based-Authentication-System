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
      process.exit(1);
    });
}

export default mongoConnect;
