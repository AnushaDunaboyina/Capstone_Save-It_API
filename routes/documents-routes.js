import express from "express";
import * as documentController from "../controllers/document-controller.js";
import upload from "../middlewares/multerConfig.js";

const router = express.Router();

// POST route to handle file uploads
router.post(
  "/upload",
  upload.single("file"), // Process file upload first
  documentController.addDocument
);

router.route("/").get(documentController.index);

router
  .route("/:id")
  .get(documentController.findDocument)
  .patch(documentController.updateDocument)
  .delete(documentController.deleteDocument);

export default router;
