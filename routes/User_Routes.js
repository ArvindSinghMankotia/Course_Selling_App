import { Router } from "express";
const User_Routes = Router();
import  {User}  from "../models/User_Model.js";

// signin the user
User_Routes.post("/signup", (req, res) => {
  res.send("the user sigin route");
});

// login the user
User_Routes.post("/login", (req, res) => {});

// get the courses you have purchaed
User_Routes.get("/purchases", (req, res) => {});

export default User_Routes;
// module.exports = router;
