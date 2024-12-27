import mongoose from "mongoose";

export async function connect(url) {
  try {
    await mongoose.connect(url);
    console.log("Database is connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
    console.log("The serve is not up ");
    process.exit(1);
  }
}
