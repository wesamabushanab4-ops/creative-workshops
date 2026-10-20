import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Instructor } from "../models/Instructor.js";
import { Workshop } from "../models/Workshop.js";

type WorkshopInput = {
  instructorId?: unknown;
  startAt?: unknown;
  endAt?: unknown;
  topic?: unknown;
  room?: unknown;
};

function parseWorkshopInput(body: WorkshopInput) {
  const { instructorId, startAt, endAt, topic, room } = body;
  if (
    typeof instructorId !== "string" ||
    !mongoose.isValidObjectId(instructorId) ||
    typeof startAt !== "string" ||
    typeof endAt !== "string" ||
    typeof topic !== "string" ||
    typeof room !== "string" ||
    !topic.trim() ||
    !room.trim()
  ) {
    return { error: "Please provide valid values for all required fields." } as const;
  }

  const parsedStart = new Date(startAt);
  const parsedEnd = new Date(endAt);
  if (Number.isNaN(parsedStart.getTime()) || Number.isNaN(parsedEnd.getTime())) {
    return { error: "Enter valid dates and times." } as const;
  }
  if (parsedStart > parsedEnd) {
    return { error: "The start time must be before the end time." } as const;
  }

  return {
    value: {
      instructorId,
      startAt: parsedStart,
      endAt: parsedEnd,
      topic: topic.trim(),
      room: room.trim(),
    },
  } as const;
}

export async function getInstructorWorkshops(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { instructorId } = request.query;
    if (typeof instructorId !== "string" || !mongoose.isValidObjectId(instructorId)) {
      response.status(400).json({ message: "Invalid instructor ID." });
      return;
    }

    const workshops = await Workshop.find({ instructorId })
      .sort({ startAt: 1 })
      .lean();
    response.json(workshops);
  } catch (error) {
    next(error);
  }
}

export async function getWorkshop(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      response.status(400).json({ message: "Invalid workshop ID." });
      return;
    }
    const workshop = await Workshop.findById(request.params.id).lean();
    if (!workshop) {
      response.status(404).json({ message: "Workshop not found." });
      return;
    }
    response.json(workshop);
  } catch (error) {
    next(error);
  }
}

export async function createWorkshop(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = parseWorkshopInput(request.body as WorkshopInput);
    if ("error" in parsed) {
      response.status(400).json({ message: parsed.error });
      return;
    }
    if (parsed.value.startAt <= new Date()) {
      response.status(400).json({ message: "A new workshop must start in the future." });
      return;
    }
    const instructorExists = await Instructor.exists({
      _id: parsed.value.instructorId,
    });
    if (!instructorExists) {
      response.status(400).json({ message: "The selected instructor was not found." });
      return;
    }

    const workshop = await Workshop.create(parsed.value);
    response.status(201).json(workshop);
  } catch (error) {
    next(error);
  }
}

export async function updateWorkshop(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      response.status(400).json({ message: "Invalid workshop ID." });
      return;
    }
    const parsed = parseWorkshopInput(request.body as WorkshopInput);
    if ("error" in parsed) {
      response.status(400).json({ message: parsed.error });
      return;
    }
    const instructorExists = await Instructor.exists({
      _id: parsed.value.instructorId,
    });
    if (!instructorExists) {
      response.status(400).json({ message: "The selected instructor was not found." });
      return;
    }

    const workshop = await Workshop.findByIdAndUpdate(
      request.params.id,
      parsed.value,
      { new: true, runValidators: true },
    );
    if (!workshop) {
      response.status(404).json({ message: "Workshop not found." });
      return;
    }
    response.json(workshop);
  } catch (error) {
    next(error);
  }
}

export async function deleteWorkshop(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      response.status(400).json({ message: "Invalid workshop ID." });
      return;
    }
    const workshop = await Workshop.findByIdAndDelete(request.params.id);
    if (!workshop) {
      response.status(404).json({ message: "Workshop not found." });
      return;
    }
    response.status(204).send();
  } catch (error) {
    next(error);
  }
}
