import User from "../models/userModel.js";
import bcryptjs from "bcryptjs"
export const signup=async(req,res,next)=>{
  const{username,email,password}=req.body;
  
  const hashed_password=bcryptjs.hashSync(password,10);
  
  const newuser=new User({username,email,password:hashed_password});
  try {
    await newuser.save();
    res.status(200).send("user created successfully")
  } catch (error) {
    next(error);
  }


}
