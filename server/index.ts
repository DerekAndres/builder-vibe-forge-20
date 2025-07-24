import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getCars,
  createCar,
  deleteCar,
  getCar,
  toggleCarVisibility,
} from "./routes/cars";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Car API routes
  app.get("/api/cars", getCars);
  app.post("/api/cars", createCar);
  app.get("/api/cars/:id", getCar);
  app.delete("/api/cars/:id", deleteCar);
  app.patch("/api/cars/:id/visibility", toggleCarVisibility);

  return app;
}
