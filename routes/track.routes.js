import express from "express";
import { getAllTracks,getTrackById,createTrack,updateTrack,deleteTrack,searchTracks } from "../controllers/track.controller.js";

const router = express.Router();

router.get("/", getAllTracks);
router.get("/:id", getTrackById);       
router.post("/", createTrack);
router.put("/:id", updateTrack);
router.delete("/:id", deleteTrack);
router.get("/search/:query", searchTracks);


export default router;
