import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import documentRoutes from "./routes/documents-routes.js";

const app = express();
const PORT = process.env.PORT || 5050;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Serve static files from the uploads-documents directory
app.use(
  "/uploads-documents",
  (req, res, next) => {
    console.log(`Static request for: ${req.path}`);
    const resolvedPath = path.join(__dirname, "/uploads-documents", req.path);
    console.log(`Resolved file path: ${resolvedPath}`);
    next();
  },
  express.static(path.join(__dirname, "/uploads-documents"))
);

console.log(
  "Serving static files from:",
  path.join(__dirname, "/uploads-documents")
);

app.use("/api/documents", documentRoutes);

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
