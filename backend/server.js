import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRouter from "./routes/contactRouter.js";
import membershipRouter from './routes/membershipRoutes.js'
import farmFundRouter from "./routes/farmFundRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const connectDB= async()=>{
    try {
        mongoose.connection.on('connected', ()=> {console.log('Database connected');}
        )
        await mongoose.connect(`${MONGO_URI}/mitimeth`)
    } catch (error) {
        console.error('connection error:', error);
    }
}

await connectDB()


app.use('/api', contactRouter)
app.use('/api', membershipRouter)
app.use('/api', farmFundRouter)



app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
})