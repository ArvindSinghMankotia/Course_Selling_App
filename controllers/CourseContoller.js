
import {purchased} from "../models/Purchases_Model.js";

export async function showAllTheCourses(req,res){  
    const userId = req.user.id; 

    if (!userId) {
      return res.status(401).json({
        msg: "User ID is not provided in the request",
      });
    }
  
    try {
      const userPurchases = await purchased
        .findOne({ userId })
        .populate("courseId"); // Populates course details
  
      if (!userPurchases || userPurchases.courseId.length === 0) {
        return res.status(404).json({
          msg: "No purchased courses found for this user",
        });
      }
  
      res.status(200).json({
        msg: "Courses retrieved successfully",
        purchasedCourses: userPurchases.courseId,
      });
    } catch (error) {
      res.status(500).json({
        msg: "An error occurred while fetching purchased courses",
        error: error.message,
      });
    }
}



export async function buyaNewCourseConroller(req,res){
    const userId = req.user.id; // Assumes middleware has added `id` to `req.user`
    const { courseId } = req.body; // Extract courseId from the request body
  
    if (!userId) {
      return res.status(401).json({
        msg: "User ID is not provided in the request",
      });
    }
  
    if (!courseId) {
      return res.status(400).json({
        msg: "Course ID is required to purchase a course",
      });
    }
  
    try {
      const updatedPurchases = await purchased.findOneAndUpdate(
        { userId }, // Match the user's purchases
        { $addToSet: { courseId } }, // Add the course ID if it doesn’t already exist
        { new: true, upsert: true } // Create a new document if it doesn't exist
      );
  
      if (!updatedPurchases) {
        return res.status(500).json({
          msg: "Failed to purchase the course",
        });
      }
  
      res.status(200).json({
        msg: "Course purchased successfully",
        purchasedCourses: updatedPurchases.courseId,
      });
    } catch (error) {
      res.status(500).json({
        msg: "An error occurred while purchasing the course",
        error: error.message,
      });
    }
}