import express from "express";
import { user } from "../models/user.js"; 
import { DeleteUser, UpdateUser, addNewUser, getAllUsers, getUserId } from "../controllers/user.js";
const router = express.Router();

router.get("/users/all" , getAllUsers)

router.get("/usersid" , getUserId)

router.post("/users/new" , addNewUser)

router.put("/users/update" , UpdateUser)

router.delete("/users/delete" , DeleteUser)

export default router
