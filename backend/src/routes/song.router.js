import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getmadeForYouSongs, getTrendingSongs } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { get } from "mongoose";


const router = Router();

router.get("/",protectRoute,requireAdmin, getAllSongs ); 
router.get("/featured", getFeaturedSongs ); 
router.get("/made-for-you", getmadeForYouSongs ); 
router.get("/trending", getTrendingSongs ); 

export default router;