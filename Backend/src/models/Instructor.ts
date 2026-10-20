import { model, Schema } from "mongoose";

const instructorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Instructor = model("Instructor", instructorSchema);
