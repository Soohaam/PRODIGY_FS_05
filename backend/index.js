import express from 'express';
import mongoose from './config/database.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import tweetRoute from './routes/tweetRoute.js';
import cors from 'cors';

const app = express();
dotenv.config({ path: ".env" });
app.use('/uploads', express.static('uploads'));
// Set up storage engine


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Uncomment and configure CORS if needed
// import cors from 'cors';
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOptions));

// api routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
