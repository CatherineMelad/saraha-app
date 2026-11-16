import mongoose from "mongoose";
import config from "../config/config.service.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    await mongoose.syncIndexes();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
