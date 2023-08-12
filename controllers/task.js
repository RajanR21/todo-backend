import {Task} from "../models/task.js"

export const newTask = async(req , res , next) => {
    const {title , description} = req.body;
   
    await Task.create({
        title , 
        description , 
        user : req.user,

    })
    res.status(201).json({
        success : true , 
        message : "Task added Successfuly"
    })
}


export const getMyTask = async(req , res , next) => {
    const TaskDetails = await Task.find({user : req.user._id})


    res.status(200).json({
        success : true , 
        TaskDetails,
    })
}


export const updateTask = async(req , res , next) => {
    const task = await Task.findById(req.params.id)

    if(!task){
        return res.status(404).json({
            success : false , 
            message : "invalid Id , Task not found",
        })
    }

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
        success : true , 
        message : "Task Updated",
    })
}

export const deleteTask = async(req , res , next) => {

    //params is parameter where id will be provided in url
    const task = await Task.findById(req.params.id)
    
    if(!task){
        return res.status(404).json({
            success : false , 
            message : "invalid Id , Task not found",
        })
    }

    await task.deleteOne();
    res.status(200).json({
        success : true , 
        message : "task deleted",
    })
}



