import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/authRoutes.js";
dotenv.config();
mongoose.connect(process.env.MONGO_URl).then(()=>{
  console.log("Database connected")}).catch((e)=>{
    console.log(e.message)
  })

const app=express();
app.use(express.json())
app.listen(3000,()=>{
  console.log("server started on port 3000 !!!");
})

app.use('/api/auth',userRouter)

app.use((err,req,res,next)=>{
  const statuscode=err.statuscode||500;
  const message=err.message||"internal server error";
  return res.status(500).json({
    success:false,
    statuscode,
    message
  })
})