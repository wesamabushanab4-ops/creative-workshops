import { Router } from "express";
import { getInstructors } from "../controllers/instructorController.js";

export const instructorRoutes = Router();
instructorRoutes.get("/", getInstructors);
