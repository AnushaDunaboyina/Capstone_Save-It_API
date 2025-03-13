import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5050;

// Logging middleware
app.use((req, res, next) => {
  console.log('Received request:', req.method, req.url);
  console.log('Request headers:', req.headers);
  req.on('data', (chunk) => {
    console.log('Request body chunk:', chunk.toString());
  });
  next();
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join("C:", "test-uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    console.log("File will be saved to:", uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const newFilename = Date.now() + path.extname(file.originalname);
    console.log("New filename:", newFilename);
    cb(null, newFilename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    console.log("File being processed:", file); // Log the file being processed
    cb(null, true); // Allow all files
  },
});

// Test route for file upload
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file,
  });
});

// Error-handling middleware (add this part near the end of the file)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Test server is running on port ${PORT}`);
});
