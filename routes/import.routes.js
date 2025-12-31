import express from "express";
import { importMusic } from "../controllers/import.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/music", protect, isAdmin, importMusic);

export default router;
