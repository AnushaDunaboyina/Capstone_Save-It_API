import express from "express";
import * as linkController from "../controllers/link-controller.js";
const router = express.Router();

router.route("/").get(linkController.index).post(linkController.addLink);

router
  .route("/:id")
  .patch(linkController.updateLink)
  .delete(linkController.deleteLink);

export default router;
