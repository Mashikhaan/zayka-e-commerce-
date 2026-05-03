/**
 * Script to list all users
 */

import mongoose from "mongoose";
import userModel from "./src/models/user.model.js";
import "dotenv/config";

async function listUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");

    const users = await userModel.find({}).select("username email role");

    console.log("Users in database:");
    users.forEach(user => {
      console.log(`- ${user.username} (${user.email}) - Role: ${user.role}`);
    });

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

listUsers();