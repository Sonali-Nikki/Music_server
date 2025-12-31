import express from "express";
import multer from "multer";
import {
  uploadEpisode,
  getEpisodesByPodcast,
  deleteEpisode,
} from "../controllers/episode.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
  "/",
  protect,
  isAdmin,
  upload.single("audio"),
  uploadEpisode
);

router.get("/:podcastId", getEpisodesByPodcast);
router.delete("/:id", protect, isAdmin, deleteEpisode);

export default router;
