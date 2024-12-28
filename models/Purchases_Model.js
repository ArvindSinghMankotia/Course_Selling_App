import mongoose, { model, Schema } from "mongoose";

const purchasedCoursesSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    courseId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        unique: true,
      },
    ],
  },
  { timestamps: true }
);

export const purchased = model("purchased", purchasedCoursesSchema);
