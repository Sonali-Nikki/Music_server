import express from "express";
import {
  upsertRecentlyPlayed,
  getRecentlyPlayed,
  getResumeTrack,
} from "../controllers/recentlyPlayed.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, upsertRecentlyPlayed);
router.get("/", protect, getRecentlyPlayed);
router.get("/:trackId", protect, getResumeTrack);

export default router;
