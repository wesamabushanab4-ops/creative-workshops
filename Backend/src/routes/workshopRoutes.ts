import { Router } from "express";
import {
  createWorkshop,
  deleteWorkshop,
  getInstructorWorkshops,
  getWorkshop,
  updateWorkshop,
} from "../controllers/workshopController.js";

export const workshopRoutes = Router();

workshopRoutes.get("/", getInstructorWorkshops);
workshopRoutes.get("/:id", getWorkshop);
workshopRoutes.post("/", createWorkshop);
workshopRoutes.put("/:id", updateWorkshop);
workshopRoutes.delete("/:id", deleteWorkshop);
