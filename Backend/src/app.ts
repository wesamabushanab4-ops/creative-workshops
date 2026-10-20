import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import { instructorRoutes } from "./routes/instructorRoutes.js";
import { workshopRoutes } from "./routes/workshopRoutes.js";

export const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
  }),
);
app.use(express.json());
app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/instructors", instructorRoutes);
app.use("/api/workshops", workshopRoutes);
app.use(errorHandler);
