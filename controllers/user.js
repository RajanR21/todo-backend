import { user } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {
    const users = await user.find({});

    res.json({
        success: true,
        users,
    })
}

export const login = async (req, res, next) => {

    const { email, password } = req.body;

    const user_exist = await user.findOne({ email }).select("+password");

    //checking if user is exist or not otherwise send 
    //error that 
    if (!user_exist) {
        return res.status(404).json({
            success: false,
            message: "Invalid Email or Password",
        })
    }
    const isMatch = await bcrypt.compare(password, user_exist.password);

    if (!isMatch) {
        return res.status(404).json({
            success: false,
            message: "Invalid Email or Password",
        })
    }

    sendCookie(user_exist, res, `Welcome back , ${user_exist.name}`);

}

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    let Myuser = await user.findOne({ email });

    if (Myuser)
        return res.status(404).json({
            success: false,
            message: "user exist",
        })

    const hashed_pass = await bcrypt.hash(password, 10)

    Myuser = await user.create({ name, email, password: hashed_pass });

    sendCookie(Myuser, res, "Registered succesfully");
}
export const getMyDetails = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    })
}

export const logout = async (req, res) => {
   
    //we have to just clear the cookie and make the token empty and
    //we will give the cookie expire time of now
    res.status(200)
        .cookie("token", "", { expires: new Date(Date.now())})
        .json({
            success: true,
        })
}
