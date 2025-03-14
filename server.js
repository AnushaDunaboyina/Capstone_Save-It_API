import express from 'express';
import cors from 'cors';
import "dotenv/config";
import upload from './middlewares/multerConfig.js';
import documentRoutes from './routes/documents-routes.js';

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware setup
app.use(cors());
app.use(express.json()); // Allows Express to parse incoming JSON data in req.body (important for APIs handling JSON requests).

// Multer middleware for file upload
app.use('/api/documents', upload.single('file'), (req, res, next) => {
  next();  // Proceed to the next middleware/route
}, documentRoutes);

// Default route
app.get('/', (_req, res) => {
  res.send('Welcome to SaveIt app');
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
