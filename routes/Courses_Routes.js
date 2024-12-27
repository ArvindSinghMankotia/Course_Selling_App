import { Router } from "express";
const Courses_Routes = Router();

import { Course } from "../models/Courses_Model.js";

//show all the courses in  a site;
Courses_Routes.get("/", (req, res) => {});

// purchase the new course
Courses_Routes.post("/purchase", (req, res) => {});

export default Courses_Routes;
