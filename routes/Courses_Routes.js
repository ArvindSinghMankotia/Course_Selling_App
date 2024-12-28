import { Router } from "express";
const Courses_Routes = Router();


import {showAllTheCourses,buyaNewCourseConroller} from "../controllers/CourseContoller.js"

import {verifieToken} from "../middlewares/verifieToken_middleware.js";

//show all the courses in  a site;
Courses_Routes.get("/", showAllTheCourses);

// purchase the new course
Courses_Routes.post("/buy",verifieToken,buyaNewCourseConroller);

export default Courses_Routes;
