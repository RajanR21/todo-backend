import express from "express"
import userRouter from "./routes/user.js"
import taskrouter from "./routes/task.js"
import { connectDB } from "./database/database.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.js"
import cors from "cors";

config({
    path : "./database/config.env"
})
const app = express()

connectDB();

// Using Middlewares

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origine : [process.env.FRONTEND_URL],
    methods : ["GET" , "PUT" , "DELETE" , "POST"],
    credentials : true,
    //if credential is false then cookie will not reac to the frontend as header
}));

//Using routes
app.use(userRouter);
app.use("/task" , taskrouter);


app.get("/" , (req,res) => {
    res.send("hiiii");
})

//using error middleware 
app.use(errorMiddleware)

app.listen(process.env.port , () => {
    console.log(`Server is working on port : ${process.env.port} in ${process.env.NODE_ENV} mod`);
})