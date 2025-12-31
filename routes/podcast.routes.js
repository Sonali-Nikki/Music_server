import express from "express";
import {
  createPodcast,
  deletePodcast,
  getAllPodcasts,
} from "../controllers/podcast.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { importPodcasts } from "../controllers/importPodcast.controller.js";

const router = express.Router();

router.post("/", protect, isAdmin, createPodcast);
router.delete("/:id", protect, isAdmin, deletePodcast);
router.get("/", getAllPodcasts);
router.post("/podcasts", protect, isAdmin, importPodcasts);


export default router;
