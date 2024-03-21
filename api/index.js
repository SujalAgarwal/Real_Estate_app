import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
mongoose.connect(process.env.MONGO_URl).then(()=>{
  console.log("Database connected")}).catch((e)=>{
    console.log(e.message)
  })

const app=express();
app.listen(3000,()=>{
  console.log("server stsrted on port 3000 !!!");
})