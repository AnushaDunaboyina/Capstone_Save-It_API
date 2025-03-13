import cors from "cors";
import express from "express";
import multer from "multer";
import documentRoutes from "./routes/documents-routes.js";

const app = express();
const PORT = process.env.PORT || 5050;

const upload = multer({ dest: "uploads/" }); // Configure multer for file uploads

app.use(cors());
app.use(express.json());

app.use("/api/documents", upload.single("file"), documentRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to SaveIt app");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
