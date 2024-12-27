import mongoose, { model, Schema } from "mongoose";

const purchasedCoursesSchema = new Schema(
  {
    courseId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        unique: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const purchased = model("purchased", purchasedCoursesSchema);
