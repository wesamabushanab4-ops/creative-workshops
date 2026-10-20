import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { Instructor } from "./models/Instructor.js";
import { Workshop } from "./models/Workshop.js";

const instructors = [
  { _id: new mongoose.Types.ObjectId("671000000000000000000001"), name: "Maya Levi" },
  { _id: new mongoose.Types.ObjectId("671000000000000000000002"), name: "Daniel Cohen" },
  { _id: new mongoose.Types.ObjectId("671000000000000000000003"), name: "Noa Barak" },
];

const workshops = [
  {
    _id: new mongoose.Types.ObjectId("672000000000000000000001"),
    instructorId: instructors[0]._id,
    startAt: new Date(Date.now() + 86_400_000),
    endAt: new Date(Date.now() + 89_100_000),
    topic: "Pottery Basics",
    room: "Art Room",
  },
  {
    _id: new mongoose.Types.ObjectId("672000000000000000000002"),
    instructorId: instructors[1]._id,
    startAt: new Date(Date.now() - 172_800_000),
    endAt: new Date(Date.now() - 169_200_000),
    topic: "Watercolor",
    room: "Studio B",
  },
  {
    _id: new mongoose.Types.ObjectId("672000000000000000000003"),
    instructorId: instructors[2]._id,
    startAt: new Date(Date.now() + 259_200_000),
    endAt: new Date(Date.now() + 262_800_000),
    topic: "Woodworking",
    room: "Craft Hall",
  },
];

try {
  await connectDatabase();
  for (const instructor of instructors) {
    await Instructor.updateOne({ _id: instructor._id }, instructor, { upsert: true });
  }
  for (const workshop of workshops) {
    await Workshop.updateOne({ _id: workshop._id }, workshop, { upsert: true });
  }
  console.info("Sample instructors and workshops are ready.");
} catch (error) {
  console.error("Failed to seed the database:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
