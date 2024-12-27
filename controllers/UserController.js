//impoert models
import { User } from "../models/User_Model.js";
import { purchased } from "../models/Purchases_Model.js";

//import services
import { verifyPassword } from "../services/verifiethePassword.js";
import { generateToken } from "../services/GernateaTokens.js";

//import zod schema
import { SignupIntput, logininput } from "../zodSchema.js";

export async function siginUserController(req, res) {
  const result = await SignupIntput.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      msg: "the user input is incorrect",
    });
  }
  const { FirstName, LastName, Email, Password } = result.data;
  const ifuserexist = await User.findOne({ Email });
  if (ifuserexist) {
    return res.status(200).json({
      msg: "The user alrady exists",
    });
  }
  try {
    const user = { FirstName, LastName, Email, Password };
    const madeUser = await User.create(user);
    console.log(madeUser);
    if (!madeUser) {
      return res.status(500).json({
        msg: "The user could not be created",
      });
    }
    res.status(201).json({
      msg: "The user is created successfully",
      user: madeUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred while creating the user",
      error: error.message,
    });
  }
}

export async function loginUserController(req, res) {
  const result = logininput.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      msg: "the user input is incorrect",
    });
  }
  const { Email, Password } = result.data;
  try {
    const ActiveUser = await User.findOne({ Email });
    // verifie the user password;
    if (!ActiveUser) {
      return res.status(404).json({
        msg: "User does not exist",
      });
    }
    const isPasswordValid = await verifyPassword(Password, ActiveUser.Password);
    if (!isPasswordValid) {
      return res.status(401).json({
        msg: "The password is incorrect",
      });
    }
    const payload = {
      email: ActiveUser.Email,
      id: ActiveUser._id,
    };
    const token = await generateToken(payload);
    return res.status(200).json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({
      msg: "An internal error occurred",
    });
  }
}

export async function getPurchasedCoursesController(req, res) {
  const id = req.user.id;
  if (!id) {
    res.status(401).json({
      msg: "The id id not present",
    });
  }
  try {
    const purchasedCourses = await purchased.findOne({ userId: id });
    if (!purchasedCourses) {
      return res.status(404).json({
        msg: "You have not purchased any courses",
      });
    }
    return res.status(200).json({
      allcourses: purchasedCourses.courseId,
    });
  } catch (error) {
    console.error("Error fetching purchased courses:", error.message);
    return res.status(500).json({
      msg: "Cannot retrieve purchased courses at the moment",
    });
  }
}
