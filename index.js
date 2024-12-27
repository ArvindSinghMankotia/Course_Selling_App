import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./db.js";

// Environment variables
dotenv.config();
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);

// import routers
import User_Routes from "./routes/User_Routes.js";
import Admin_Routes from "./routes/Admin_Routes.js";
import Courses_Routes from "./routes/Courses_Routes.js";

//Routes
app.use("/user", User_Routes);
app.use("/admin", Admin_Routes);
app.use("/courses", Courses_Routes);

async function start() {
  //connect the database;
  await connect(process.env.DB_URL);
  app.listen(process.env.PORT, () => {
    console.log(`The serve is up at port ${process.env.PORT}`);
  });
}

start();
