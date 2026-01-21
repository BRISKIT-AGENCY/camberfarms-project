import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRouter from "./routes/contactRouter.js";
import membershipRouter from './routes/membershipRoutes.js'
import farmFundRouter from "./routes/farmFundRoutes.js";
import blogRouter from "./routes/blogRoutes.js"
import exportBlogRouter from './routes/exportBlogRoutes.js'
import newsRouter from "./routes/newsRoutes.js"
import adminRouter from './routes/adminRoutes.js';
import affiliateRouter from './routes/affiliateRoutes.js'
import feedbackRouter from './routes/feedbackRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import productRouter from './routes/productRoutes.js';
import { trackVisitor } from "./middleware/trackVisitor.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(trackVisitor);

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
app.use('/api/africa', blogRouter)
app.use('/api/export', exportBlogRouter)
app.use('/api/africa', newsRouter)
app.use('/api/admin', adminRouter)
app.use('/api', affiliateRouter)
app.use('/api/export', feedbackRouter)
app.use('/api/export', messageRouter)
app.use('/api/', productRouter)




app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
})