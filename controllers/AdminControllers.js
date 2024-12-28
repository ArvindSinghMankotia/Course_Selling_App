//import models
import { Admin,Course} from "../models/Admin.Model.js";

//import services
import { verifyPassword } from "../services/verifiethePassword.js";
import { generateToken } from "../services/GernateaTokens.js";

//import zod schema
import { SignupIntput, logininput,courseInput} from "../zodSchema.js";

export async function singnupAdminController(req,res){
    const result = await SignupIntput.safeParse(req.body);
    if(!result.success){
        res.status(400).json({
            msg:"The user input is wrong"
        })
    }
    const { FirstName, LastName, Email, Password } = result.data;
    const ifuserexist = await Admin.findOne({ Email });
    if (ifuserexist) {
        return res.status(200).json({
          msg: "The user alrady exists",
        });
    }
     try {
        const user = { FirstName, LastName, Email, Password };
        const madeUser = await Admin.create(user);
        console.log(madeUser);
        if (!madeUser) {
          return res.status(500).json({
            msg: "The Admin could not be created",
          });
        }
        res.status(201).json({
          msg: "The Admin is created successfully",
          user: madeUser,
        });
      } catch (error) {
        res.status(500).json({
          msg: "An error occurred while creating the Admin",
          error: error.message,
        });
      }
}


export async function loginAdminController(req,res){
    const result = logininput.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          msg: "the user input is incorrect",
        });
      }
      const { Email, Password } = result.data;
      try {
        const ActiveUser = await Admin.findOne({ Email });
        // verifie the user password;
        if (!ActiveUser) {
          return res.status(404).json({
            msg: "Admin does not exist",
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


export async function addnewCourseController(req,res){
    const id = req.user.id;
    if (!id) {
        res.status(401).json({
          msg: "The id id not present",
        });
    }
    const newcourseDetails = {
        title : req.body.title,
        description :req.body.description,
        price : req.body.price,
        imageUrl : req.body.imageUrl,
    }
    const result = courseInput.safeParse(newcourseDetails);
    if(!result.success){
        res.status(400).json({
            msg: "the user input is incorrect",
        });
    }
    try{
        // important way to add a course
        const newCourse =await Course.findOneAndUpdate(
            {createrID : id},
            {$push :{AllCourses :newcourseDetails}},
            {new:true , upsert : true}
        );
        if(!newCourse){
            return res.status(500).json({
                msg: "The Couse could not be created",
            });
        }
        res.status(201).json({
            msg: "The Course is created successfully",
            Course: newCourse,
        });
    }
    catch(error){
        res.status(500).json({
            msg: "An error occurred while creating the Course",
            error: error.message,
        });
    }
}

export async function deleteCourseController(req,res){
    const id = req.user.id;
    if (!id) {
        res.status(401).json({
          msg: "The id is not present",
        });
    }
    const deleteacourseid = req.body.id;
    if(!deleteacourseid){
        res.status(401).json({
            msg: "The Course id is not present",
        }); 
    }
    try{
        const result = await Course.findOneAndUpdate(
            { createrID: id }, // Query to find the document by admin ID
            { $pull: { AllCourses: { _id: deleteacourseid } } }, // Use $pull to remove the course with the matching ID
            { new: true } // Return the updated document
        );
        if (!result) {
            return res.status(404).json({
                msg: "Course or admin not found",
              });
          }
      
          res.status(200).json({
            msg: "Course deleted successfully",
            updatedCourses: result.AllCourses,
          });
    }
    catch(error){
        res.status(500).json({
            msg: "Error fetching courses:",
            error: error.message,
        });
    }

}

//for future - > update the course scheam to save the videos, pdfs, images etc urls.
// export async function updateCourseController(req,res){
//     const id = req.user.id;
//     if (!id) {
//         res.status(401).json({
//           msg: "The id id not present",
//         });
//     }

// }

export async function getAllCourseController(req,res){
    const id = req.user.id;
    if (!id) {
        res.status(401).json({
          msg: "The id id not present",
        });
    }
    try {
    const courses = await Course.findOne({ createrID: id }).populate("createrID");
    if (!courses) {
      return res.status(404).json({
        msg: "No courses found for this admin.",
      });
    }
    res.status(200).json({
      msg: "Courses retrieved successfully",
      courses: courses.AllCourses,
    });
  } catch (error) {
    res.status(500).json({
        msg: "Error fetching courses:",
        error: error.message,
    });
  }
}