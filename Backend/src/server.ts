import "dotenv/config";
import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = Number(process.env.PORT ?? 4000);

try {
  await connectDatabase();
  app.listen(port, () => {
    console.info(`Creative Workshops API listening on http://localhost:${port}`);
  });
} catch (error) {
  console.error("Failed to start the API:", error);
  process.exitCode = 1;
}
