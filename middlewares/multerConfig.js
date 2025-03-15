import multer from "multer"; // Middleware for handling file uploadsin Node.js
import path from "path"; // Helps manage file paths (works across different OS)
import fs from "fs"; // File system module (used here to check/create directories)

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const uploadPath = path.join("C:", "test-uploads");
    const uploadPath = path.join(
      "C:",
      "Users",
      "vikas",
      "OneDrive",
      "Desktop",
      "uploads-documents"
    );
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const userFilename = req.body.filename.trim();
    const sanitizedFilename = userFilename.replace(/\s+/g, "_");
    const fileExtension = path.extname(file.originalname);
    cb(null, `${sanitizedFilename}${fileExtension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    cb(null, true); // Allow all files
  },
});

export default upload;
