import { Router } from "express";
const User_Routes = Router();

//import middleware
import { verifieToken } from "../middlewares/verifieToken_middleware.js";
//import controllers
import {
  siginUserController,
  loginUserController,
  getPurchasedCoursesController,
} from "../controllers/UserController.js";

// signin the user
User_Routes.post("/signup", siginUserController);

// login the user
User_Routes.post("/login", loginUserController);

// get the courses you have purchaed
User_Routes.get("/purchases", verifieToken, getPurchasedCoursesController);

export default User_Routes;
