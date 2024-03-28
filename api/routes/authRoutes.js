import express from "express"
import { google, signin, signup,signOut } from "../controllers/authController.js";
const Router=express.Router();

Router.post('/signup',signup)
Router.post('/signin',signin)
Router.post('/google',google)
Router.get("/signout", signOut);
export default Router;