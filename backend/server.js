import express from 'express';
import cookieParser from 'cookie-parser';
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import searchRoutes from "./routes/search.routes.js";

import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js';


const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();


app.use(express.json());//allows to parse req.body 
app.use(cookieParser()); //Parse cookies

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/media", protectRoute, movieRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
// app.use("/api/v1/tv", tvRoutes);

if(ENV_VARS.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
    })
}

app.listen(PORT,()=>{
    console.log("Server listening at http://localhost:"+PORT);
    connectDB();
})