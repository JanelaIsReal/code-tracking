import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllSongs } from "../controller/song.controller.js";

const router = Router();

router.get("/",protectRoute, getAllUsers);

export default router;