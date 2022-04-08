import { Request, Response } from "express";
import TaskBusiness from "../../Business/Task/TaskBusiness";
import TaskDatabase from "../../Data/Task/TaskDatabase";
import { deleteTaskInputDTO, getTasksInputDTO, TaskInputDTO, UpdateTaskInputDTO } from "../../Model/Task/Task";

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

    getTaskByIdOrStatus = async (req: Request, res: Response) => {

        const input: getTasksInputDTO = {
            token: req.headers.authorization,
            id: req.body.id,
            done: req.body.done
        }

        try {

            const result = await this.taskBusiness.getTaskByIdOrStatus(input)

            res.status(200).send({
                result
            })
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }

    }

    updateTask = async (req: Request, res: Response) => {

        const updateInput: UpdateTaskInputDTO = {
            token: req.headers.authorization,
            id: req.params.id,
            title: req.body.title,
            done: req.body.done,
            date: req.body.date,
        }

        try {

            const token = await this.taskBusiness.updateTask(updateInput)

            res.status(200).send({
                message: "Task successfully updated!",
                token
            })
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }

    }

    deleteTask = async (req: Request, res: Response) => {

        const deleteInput: deleteTaskInputDTO = {
            token: req.headers.authorization,
            id: req.params.id,
        }

        try {

            const token = await this.taskBusiness.deleteTask(deleteInput)

            res.status(200).send({
                message: "Task successfully deleted!",
                token
            })
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }

    }
}