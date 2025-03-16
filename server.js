import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import path from "path";

import documentRoutes from "./routes/documents-routes.js";

const app = express();
const PORT = process.env.PORT || 5050;

// Serve static files from the uploads-documents directory
app.use(
  "/uploads-documents",
  express.static(
    path.join(
      "C:",
      "Users",
      "vikas",
      "OneDrive",
      "Desktop",
      "uploads-documents"
    )
  )
);

// Middleware setup
app.use(cors());
app.use(express.json()); // Allows Express to parse incoming JSON data in req.body (important for APIs handling JSON requests).
app.use(express.urlencoded({ extended: true })); // Parse form data (important for req.body)

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
