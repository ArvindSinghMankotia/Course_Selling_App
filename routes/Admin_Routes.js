import { Router } from "express";
const Admin_Routes = Router();
import { Admin } from "../models/Admin.Model.js";

// signin the user 
Admin_Routes.post("/signup",(req,res)=>{
    res.send("the user sigin route")
});


// login the user 
Admin_Routes.post("/login",(req,res)=>{

});

// add a new course
Admin_Routes.post("/addcourse",(req,res)=>{

})

// delete an existing course of the logined admin
Admin_Routes.delete("/deleteacourse",(req,res)=>{

})

// updatig the course details like -> name,price , content 
Admin_Routes.patch("/updateacourse",(req,res)=>{

})

// get all the courses which he has created;
Admin_Routes.get("/courses",(req,res)=>{

})

export default Admin_Routes ;