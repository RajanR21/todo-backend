import jwt from "jsonwebtoken"


export const sendCookie = (Myuser , res , mssg)=> {

    const token = jwt.sign({ _id: Myuser._id }, "nwiieowwefecoc")

    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000   //expire after 15 second
    }).json({
        success: true,
        message: mssg,
    })

}