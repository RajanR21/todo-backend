import  express  from "express";
import {deleteTask, getMyTask, newTask, updateTask} from "../controllers/task.js"
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new" ,isAuthenticated ,  newTask);
router.get("/mytasks" ,isAuthenticated ,  getMyTask);

//this is used when id is provided as a parameter and we have to give it with url
// like http://localhost:5000/task/64d77311222d48e2ddfb4bf5
// if it is in put mode then update router will triggereed else delete will triggred
router.route("/:id").put(isAuthenticated ,  updateTask).delete(isAuthenticated ,  deleteTask);
export default router; 