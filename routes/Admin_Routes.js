import { Router } from "express";
const Admin_Routes = Router();

import {verifieToken} from "../middlewares/verifieToken_middleware.js"


import {singnupAdminController,loginAdminController,addnewCourseController,deleteCourseController,getAllCourseController} from "../controllers/AdminControllers.js";
// signin the user
Admin_Routes.post("/signup",singnupAdminController);

// login the user
Admin_Routes.post("/login", loginAdminController);

// add a new course
Admin_Routes.post("/addcourse",verifieToken,addnewCourseController);

// delete an existing course of the logined admin
Admin_Routes.delete("/deleteacourse",verifieToken,deleteCourseController);

// updatig the course details like -> name,price , content
// Admin_Routes.patch("/updateacourse",verifieToken, updateCourseController); // not implemented

// get all the courses which he has created;
Admin_Routes.get("/courses",verifieToken, getAllCourseController);

export default Admin_Routes;
