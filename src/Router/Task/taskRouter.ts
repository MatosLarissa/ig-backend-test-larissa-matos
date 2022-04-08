import express from "express"
import {TaskController} from "../../Controller/Task/TaskController"

export const taskRouter = express.Router()

const taskController = new TaskController()

taskRouter.post("/creatTask", taskController.createTask)
taskRouter.get("/", taskController.getAllTaskByUser)