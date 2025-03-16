import multer from "multer"; // Middleware for handling file uploadsin Node.js
import path from "path"; // Helps manage file paths (works across different OS)
import fs from "fs"; // File system module (used here to check/create directories)

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(
      "C:",
      "Users",
      "vikas",
      "OneDrive",
      "Desktop",
      "uploads-documents"
    );

    // Ensure the upload directory exists, create it if it doesn't
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); // Set the destination path
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    console.log("File Filter - File:", file); // Debug file
    cb(null, true); // Allow all files
  },
});

export default upload;
