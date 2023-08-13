import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js"

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,

        })
        res.status(201).json({
            success: true,
            message: "Task added Successfuly"
        })
    } catch (error) {
        next(error);
    }
}


export const getMyTask = async (req, res, next) => {
    try {
        const TaskDetails = await Task.find({ user: req.user._id })


        res.status(200).json({
            success: true,
            TaskDetails,
        })
    } catch (error) {
        next(error)
    }
}


export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)

        if (!task) {
            return next(new ErrorHandler("Invalid Id , Task not found", 404));
        }

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated",
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {

    try {
        //params is parameter where id will be provided in url
        const task = await Task.findById(req.params.id)

        if (!task) {
            return next(new ErrorHandler("Invalid Id , Task not found", 404));
        }

        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "task deleted",
        })
    } catch (error) {
        next(error)
    }
}



