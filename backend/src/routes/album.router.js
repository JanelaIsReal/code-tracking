import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";

const router = Router();

router.get("/", getAllAlbums ); 
router.get("/:AlbumId", getAlbumById); 

export default router;