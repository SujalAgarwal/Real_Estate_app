import express from "express"
import { google, signin, signup } from "../controllers/authController.js";
const Router=express.Router();

Router.post('/signup',signup)
Router.post('/signin',signin)
Router.post('/google',google)
export default Router;