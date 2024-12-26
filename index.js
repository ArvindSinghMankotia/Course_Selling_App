import express from "express";
import dotenv from "dotenv";

//routes
import User_Routes from "./routes/User_Routes.js"
import Admin_Routes from "./routes/Admin_Routes.js"
import Courses_Routes from "./routes/User_Routes.js"

dotenv.config()

const app  = express();


//user router
app.use("/user",User_Routes);

//admin router
app.use("/admin",Admin_Routes);

//courses router
app.use("/courses",Courses_Routes);


app.listen(process.env.PORT,()=>{
    console.log("The serve is up");
})
