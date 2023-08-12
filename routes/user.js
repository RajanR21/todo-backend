import express from "express";
import { getAllUsers, getMyDetails , login,logout , register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.get("/all" , getAllUsers)

router.get("/me" , isAuthenticated ,  getMyDetails)

router.get("/logout" , logout)

router.post("/login" , login)

router.post("/new" , register)
export default router
