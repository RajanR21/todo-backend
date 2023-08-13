import express from "express"
import userRouter from "./routes/user.js"
import taskrouter from "./routes/task.js"
import { connectDB } from "./database/database.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.js"

config({
    path : "./database/config.env"
})
const app = express()

connectDB();

// Using Middlewares

app.use(express.json()); 
app.use(cookieParser());

//Using routes
app.use(userRouter);
app.use("/task" , taskrouter);


app.get("/" , (req,res) => {
    res.send("hiiii");
})

//using error middleware
app.use(errorMiddleware)
/*
app.get("/users/all" , async(req,res) => {
    const users = await user.find({});
  
    res.json({
        success : true , 
        users ,
    })

})

app.get("/usersid" , async(req,res) => {
    const id = req.body.id;
    const users = await user.findById(id);
  
    res.json({
        success : true , 
        users,
    })
})

app.post("/users/new" , async(req,res) => {
    const {name , email , password} = req.body;

    user.create({
        name,
        email,
        password,
    })

    //we can send the code also as created(201) and can also send a cookie
    res.status(201).cookie("tmp" , "lol").json({
        success : true , 
        message : "Registered Successfuly",
    })
})

*/
app.listen(5000 , () => {
    console.log("working");
})