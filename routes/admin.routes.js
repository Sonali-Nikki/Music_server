import express from "express";
import multer from "multer";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import {
  uploadTrack,
  deleteTrack,
} from "../controllers/admin.controller.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
  "/tracks",
  protect,
  isAdmin,
  upload.single("audio"),
  uploadTrack
);

router.delete(
  "/tracks/:id",
  protect,
  isAdmin,
  deleteTrack
);

export default router;
