import express from "express";
import * as noteController from "../controllers/note-controller.js";
const router = express.Router();

router.route("/").get(noteController.index).post(noteController.addNote);

router
  .route("/:id")
  .get(noteController.findNoteById)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);

  // Add the AI processing route
router.post("/process-ai", noteController.processNoteWithAI);
  
export default router;
