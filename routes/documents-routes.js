import express from "express";
import * as documentController from "../controllers/document-controller.js";
import upload from "../middlewares/multerConfig.js";

const router = express.Router();

// POST route to handle file uploads
router.post("/upload", upload.single("file"), documentController.addDocument);

// Route to get all documents
router.route("/").get(documentController.index);

// Route to search documents
router.get("/search", documentController.searchDocuments);

// Routes to get, update, and delete a single document
router
  .route("/:id")
  .get(documentController.findDocument)
  .patch(documentController.updateDocument)
  .delete(documentController.deleteDocument);


export default router;
