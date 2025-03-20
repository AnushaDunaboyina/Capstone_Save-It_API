import express from "express";
import * as calendarController from "../controllers/calendar-controller.js";

const router = express.Router();

router.post("/addEvent", calendarController.addEvent);
router.get("/getEvents", calendarController.getEvents);
router.patch("/:id/updateEvent", calendarController.updateEvent);
router.delete("/:id/deleteEvent", calendarController.deleteEvent);

export default router;
