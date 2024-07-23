import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './db/index.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js'
import chatRoutes from './routes/chat.routes.js'
import problemRoutes from './routes/problems.route.js';

dotenv.config({
    path: './.env'
})

const app = express();

app.use(cors({
    origin:[process.env.CORS_ORIGIN1, process.env.CORS_ORIGIN2]
}));

app.use(express.json({limit: "30mb"}));

app.use(express.urlencoded({extended: true, limit: "50kb"}));

app.use(express.static("public"));

app.use(cookieParser()); 


//Using Routes 
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/problems", problemRoutes);

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