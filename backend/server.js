import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';


const app = express();
app.use(express.json());//allows to parse req.body 

app.use("/api/v1/auth",authRoutes);


const PORT = ENV_VARS.PORT;

app.listen(PORT,()=>{
    console.log("Server listening at http://localhost:"+PORT);
    connectDB();
})