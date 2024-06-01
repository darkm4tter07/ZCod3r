import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './db/index.js';
import userRoutes from './routes/user.routes.js';
dotenv.config({
    path: './.env'
})

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "1mb"}));

app.use(express.urlencoded({extended: true, limit: "50kb"}));

app.use(express.static("public"));

app.use(cookieParser()); 

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8000;
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})