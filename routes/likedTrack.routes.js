import express from "express";
import {
  likeTrack,
  unlikeTrack,
  getLikedTracks,
} from "../controllers/likedTrack.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/like", protect, likeTrack);
router.post("/unlike", protect, unlikeTrack);
router.get("/", protect, getLikedTracks);

export default router;
