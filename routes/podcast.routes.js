import express from "express";
import {
  createPodcast,
  deletePodcast,
  getAllPodcasts,
} from "../controllers/podacast.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";


const router = express.Router();

router.post("/", protect, isAdmin, createPodcast);
router.delete("/:id", protect, isAdmin, deletePodcast);
router.get("/", getAllPodcasts);



export default router;
