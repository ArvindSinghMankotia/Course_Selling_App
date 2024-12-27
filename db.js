import mongoose from "mongoose";

async function connect(url) {
  try {
    await mongoose.connect(url);
    console.log("Database is connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
    console.log("The serve has been put down because of the Database error ");
    process.exit(1);
  }
}

export default connect;
