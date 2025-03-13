import multer from "multer";
import path from "path";
import fs from "fs";

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
    const newFilename = Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
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
