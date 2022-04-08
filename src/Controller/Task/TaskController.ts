import { Request, Response } from "express";
import TaskBusiness from "../../Business/Task/TaskBusiness";
import TaskDatabase from "../../Data/Task/TaskDatabase";
import { TaskInputDTO } from "../../Model/Task/Task";

export class TaskController {

    private taskBusiness: TaskBusiness
    constructor() {
        this.taskBusiness = new TaskBusiness(new TaskDatabase)
    }

    createTask = async (req: Request, res: Response) => {

        const taskInput: TaskInputDTO = {
            token: req.headers.authorization,
            title: req.body.title,
            done: req.body.done,
            date: req.body.date
        }

        try {

            const token = await this.taskBusiness.createTask(taskInput)

            res.status(201).send({
                message: "Task created successfully!",
                token
            })

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }

    }

    getAllTaskByUser = async (req: Request, res: Response) => {

        const token = req.headers.authorization

        try {

            const result = await this.taskBusiness.getAllTaskByUser(token)

            res.status(200).send({
                result
            })
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }

    }
}