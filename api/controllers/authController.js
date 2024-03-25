import User from "../models/userModel.js";
import bcryptjs from "bcryptjs"
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
export const signup=async(req,res,next)=>{
  const{username,email,password}=req.body;
  
  const hashed_password=bcryptjs.hashSync(password,10);
  
  const newuser=new User({username,email,password:hashed_password});
  try {
    await newuser.save();
    res.status(200).json("user created successfully")
  } catch (error) {
    next(error);
  }


}
export const signin=async(req,res,next)=>{
  const {email,password}=req.body;

  try {
    const validuser=await User.findOne({email});
    
    if(!validuser)
    {
      return next(errorhandler(404,"user not found"));
    }
    const validPassword=bcryptjs.compareSync(password,validuser.password);
    if(!validPassword)
    {
      return next(errorhandler(401,"Wrong cerendials"));
    }
    const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET);
    const {password:pass,...rest}=validuser._doc;
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)

  } catch (error) {
    next(error);
  }

}
