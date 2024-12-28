import { purchased } from "../models/Purchases_Model.js";
import { Course } from "../models/Courses_Model.js";
export async function showAllTheCourses(req, res) {
  try {
    
    const courses = await Course.find({}, "AllCourses"); 

    if (courses.length === 0) {
      return res.status(404).json({
        msg: "No courses found",
      });
    }

    // Flatten the array of courses from each document
    const allCourses = courses.map((course) => course.AllCourses).flat();

  
    return res.status(200).json({
      msg: "All courses fetched successfully",
      courses: allCourses,
    });
  } catch (error) {
    
    return res.status(500).json({
      msg: "Error fetching courses",
      error: error.message,
    });
  }
}

export async function buyaNewCourseConroller(req, res) {
  const userId = req.user.id;
  const courseId = req.body.id;
  console.log(courseId);

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
      { userId },
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
