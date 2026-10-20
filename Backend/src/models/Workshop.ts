import { model, Schema } from "mongoose";

const workshopSchema = new Schema(
  {
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
      index: true,
    },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    topic: { type: String, required: true, trim: true },
    room: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Workshop = model("Workshop", workshopSchema);
