/**
 * Script to make a user admin
 * Run with: node make-admin.js <email>
 */

import mongoose from "mongoose";
import userModel from "./src/models/user.model.js";
import "dotenv/config";

async function makeAdmin(email) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");

    const user = await userModel.findOneAndUpdate(
      { email: email },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log("User not found");
      return;
    }

    console.log("User updated to admin:", user.email, user.role);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

// Get email from command line argument
const email = process.argv[2];
if (!email) {
  console.log("Usage: node make-admin.js <email>");
  process.exit(1);
}

makeAdmin(email);