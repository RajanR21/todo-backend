import jwt from "jsonwebtoken"


export const sendCookie = (Myuser , res , mssg)=> {

    const token = jwt.sign({ _id: Myuser._id }, "nwiieowwefecoc")

    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,   //expire after 15 second
        sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
        //provided samesite and secure because 3 mods of cookiesending 
        //lax is default mode  
        //in strict mode cookie will not be send to any third party web request.
        //hence provide it none mod hence cookie will be send to all the context
        secure : process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success: true,
        message: mssg,
    })

}