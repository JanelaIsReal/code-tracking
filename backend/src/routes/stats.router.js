import { Router } from "express";
import {Song} from "../models/songs.model.js";
import {User} from "../models/user.model.js";
import {Album} from "../models/album.model.js";


const router = Router();

router.get("/", async (req, res) =>{
    try {
        // const totalSongs = await Song.countDocuments();
        // const totalUsers = await User.countDocuments();
        // const totalAlbums = await Album.countDocuments();
        
        const [totalSongs, totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),

            Song.aggregate([
                {
                    $unionWith:{
                        coll:"albums",
                        pipeline:[]
                    }
                },
                {
                    $group: {
                        _id: "$artist",
                    }
                },
                {
                    $count: "count"
                }
            ])
        ]);

    } catch (error) {
        next(error);
    }
} ); 

export default router;