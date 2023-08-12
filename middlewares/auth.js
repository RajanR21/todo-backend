import { user } from "../models/user.js"
import jwt from "jsonwebtoken"


export const isAuthenticated = async(req , res , next)=> {
   
    const {token} = req.cookies

    if(!token){
        return res.status(404).json({
            success: false,
            message: "log in first",
        })
    }
    
    const decoded = jwt.verify(token , "nwiieowwefecoc")
    req.user = await user.findById(decoded._id);
    next();
}