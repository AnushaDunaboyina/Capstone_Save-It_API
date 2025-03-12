import express from "express";
import * as documentController from "../controllers/document-controller.js";
const router = express.Router();

router.route("/")
  .get(documentController.index)
  .post(documentController.addDocument);

router.route("/:id")
  .delete(documentController.deleteDocument);

export default router;