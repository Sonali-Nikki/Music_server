import express from "express";
import { importMusic } from "../controllers/import.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/music", protect, isAdmin, importMusic);

export default router;
