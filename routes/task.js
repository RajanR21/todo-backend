import  express  from "express";
import {newTask} from "../controllers/task.js"
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new" ,isAuthenticated ,  newTask);

export default router; 