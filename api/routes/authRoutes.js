import express from "express"
import { signup } from "../controllers/authController.js";
const Router=express.Router();

Router.get('/signup',signup)

export default Router;