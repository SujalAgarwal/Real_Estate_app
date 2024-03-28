import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js"
import listingRouter from "./routes/listingRoute.js"
import cookieParser from "cookie-parser";
dotenv.config();
mongoose.connect(process.env.MONGO_URl).then(()=>{
  console.log("Database connected")}).catch((e)=>{
    console.log(e.message)
  })

const app=express();
app.use(express.json())
app.use(cookieParser())
app.listen(3000,()=>{
  console.log("server started on port 3000 !!!");
})
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)
app.use((err,req,res,next)=>{
  const statuscode=err.statuscode||500;
  const message=err.message||"internal server error";
  return res.status(500).json({
    success:false,
    statuscode,
    message
  })
})