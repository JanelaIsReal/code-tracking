import express from "express";
import dotenv from "dotenv";
import {clerkmiddleware} from "@clerk/express";
import {fileUpload} from "express-fileupload";
import path from "path";

import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.router.js";
import adminRoutes from "./routes/admin.router.js";
import songRoutes from "./routes/song.router.js";
import albumRoutes from "./routes/album.router.js";
import statsRoutes from "./routes/stats.router.js";


dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //to parse req.body
app.use(clerkmiddleware()); //this will add auth to request obj
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "/temp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes); 

//Error handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message});
})


app.listen(PORT, () =>{
    console.log("Server in port:"+PORT);
    connectDB();
})