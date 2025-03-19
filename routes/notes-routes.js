import express from "express";
import * as noteController from "../controllers/note-controller.js";
const router = express.Router();

router.route("/").get(noteController.index).post(noteController.addNote);

router
  .route("/:id")
  .get(noteController.findNoteById)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);
  
export default router;
