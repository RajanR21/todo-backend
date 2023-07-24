import { user } from "../models/user.js"

export const getAllUsers =  async(req,res) => {
    const users = await user.find({});
  
    res.json({
        success : true , 
        users ,
    })

}

export const addNewUser = async(req,res) => {
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
}


export const UpdateUser = async(req,res) => {
    
    //we can send the code also as created(201) and can also send a cookie
    res.status(201).cookie("tmp" , "lol").json({
        success : true , 
        message : "Registered Successfuly",
    })
}

export const DeleteUser = async(req,res) => {
    
   

    //we can send the code also as created(201) and can also send a cookie
    res.status(201).cookie("tmp" , "lol").json({
        success : true , 
        message : "Registered Successfuly",
    })
}

export const getUserId = async(req,res) => {
    const id = req.body.id;
    const users = await user.findById(id);
  
    res.json({
        success : true , 
        users,
    })
}
