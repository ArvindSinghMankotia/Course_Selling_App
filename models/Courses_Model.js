import mongoose, { model, Schema } from "mongoose";
const CourseSchema = new Schema(
  {
    createrID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    AllCourses : [{
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min : 0
      },
      imageUrl: {
        type: String,
        default: ""
      }
    }
    ]
  },
  { timestamps: true }
);

export const Course = model("Course", CourseSchema);
