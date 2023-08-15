import { user } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res , next) => {
   try {
    const users = await user.find({});

    res.json({
        success: true,
        users,
    })
   } catch (error) {
    next(error)
   }
}

export const login = async (req, res, next) => {
try {
    
    const { email, password } = req.body;

    const user_exist = await user.findOne({ email }).select("+password");

    //checking if user is exist or not otherwise send 
    //error that 
    if (!user_exist) {

        return next(new ErrorHandler("Invalid Email or Password" , 404));
        
    }
    const isMatch = await bcrypt.compare(password, user_exist.password);

    if (!isMatch) {
        return next(new ErrorHandler("Invalid Email or Password" , 404));
    }

    sendCookie(user_exist, res, `Welcome back , ${user_exist.name}`);
} catch (error) {
    next(error)
}

}

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

    let Myuser = await user.findOne({ email });

    if (Myuser)
    return next(new ErrorHandler("User allready exist" , 400));

    const hashed_pass = await bcrypt.hash(password, 10)

    Myuser = await user.create({ name, email, password: hashed_pass });

    sendCookie(Myuser, res, "Registered succesfully");
    } catch (error) {
        next(error)
    }
}
export const getMyDetails = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    })
}

export const logout = (req, res) => {
   
    //we have to just clear the cookie and make the token empty and
    //we will give the cookie expire time of now
    res.status(200)
        .cookie("token", "", { 
            expires: new Date(Date.now()),
            sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
            //provided samesite and secure because 3 mods of cookiesending 
            //lax is default mode  
            //in strict mode cookie will not be send to any third party web request.
            //hence provide it none mod hence cookie will be send to all the context
            secure : process.env.NODE_ENV === "Development" ? false : true
        })
        .json({
            success: true,
        })
}
