import express from "express";
import {
  createPlaylist,
  getUserPlaylists,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
} from "../controllers/playlist.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createPlaylist);
router.get("/", protect, getUserPlaylists);
router.post("/add-track", protect, addTrackToPlaylist);
router.post("/remove-track", protect, removeTrackFromPlaylist);

export default router;
