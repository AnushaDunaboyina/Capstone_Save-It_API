import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


// Define __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads-documents");

    // Ensure the upload directory exists, create it if it doesn't
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    console.log(uploadPath);
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
