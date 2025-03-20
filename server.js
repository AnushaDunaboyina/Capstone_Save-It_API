import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import documentRoutes from "./routes/documents-routes.js";
import linkRoutes from "./routes/links-routes.js";
import noteRoutes from "./routes/notes-routes.js";
import calendarRoutes from "./routes/calendar-routes.js";

const app = express();
const PORT = process.env.PORT || 5050;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads-documents folder exists
const uploadDir = path.join(__dirname, "/uploads-documents");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("uploads-documents folder created successfully!");
}

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads-documents directory
app.use(
  "/uploads-documents",
  (req, res, next) => {
    const resolvedPath = path.join(__dirname, "/uploads-documents", req.path);

    next();
  },
  express.static(path.join(__dirname, "/uploads-documents"))
);

// Serve static files from the assets directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/api/documents", documentRoutes);

app.use("/api/links", linkRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/calendar", calendarRoutes);

// Default route
app.get("/", (_req, res) => {
  res.send("Welcome to SaveIt app");
});

// Error handling middleware for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
