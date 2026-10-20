import type { Request, Response, NextFunction } from "express";
import { Instructor } from "../models/Instructor.js";

export async function getInstructors(
  _request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const instructors = await Instructor.find().sort({ name: 1 }).lean();
    response.json(instructors);
  } catch (error) {
    next(error);
  }
}
