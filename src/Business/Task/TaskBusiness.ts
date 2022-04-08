import { IdGenerator } from "../../Services/IdGenerator";
import { Authenticator } from "../../Services/Authenticator";
import { CustomError } from "../../Error/CustomError";
import { booleanToDone, deleteTaskInputDTO, getTasksInputDTO, stringToDone, Task, TaskInputDTO, UpdateTaskInputDTO } from "../../Model/Task/Task";
import { TaskRepository } from "./TaskRepository";
import { DateFormat } from "../../Services/DateFormat";


export default class TaskBusiness {

    private taskData: TaskRepository
    private idGenerator: IdGenerator
    private authenticator: Authenticator
    private dateFormat: DateFormat


    constructor(taskDataImplementation: TaskRepository) {

        this.taskData = taskDataImplementation
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
        this.dateFormat = new DateFormat()
    }

    createTask = async (input: TaskInputDTO) => {
        const { token, title, done, date, } = input

        if (!token) {
            throw new CustomError(422, "Please, login to create a task")
        }
        if (!title) {
            throw new CustomError(422, "Please, inform a title for new task.")
        }

        if (!done) {
            throw new CustomError(422, "Please, inform a status for new task.")
        }

        if (!date) {
            throw new CustomError(422, "Please, inform a date for new task.")
        }

        const tokenData = this.authenticator.getTokenData(token)
        if (!tokenData) {
            throw new CustomError(422, "Invalid token.")
        }
        const userId = tokenData.id

        const dateCreated = new Date()

        const taskDate = this.dateFormat.formatPT(date) as Date

        let status: boolean

        const validateStatus = stringToDone(done.toUpperCase())

        const validateDone = booleanToDone(validateStatus, status)

        const id = this.idGenerator.generate()

        const task = new Task(
            id,
            dateCreated,
            title,
            validateDone,
            taskDate,
            userId
        )

        await this.taskData.createTask(task)

        const accessToken = this.authenticator.generateToken({ id: userId })

        return accessToken
    }
    
    getAllTaskByUser = async (token: string) => {

        if (!token) {
            throw new CustomError(422, "Please login")
        }

        const tokenData = this.authenticator.getTokenData(token)
        if (!tokenData) {
            throw new CustomError(422, "Invalid token.")
        }

        const userId = tokenData.id

        const result = this.taskData.getAllTaskByUser(userId)

        if (!result) {
            throw new CustomError(404, "Task not found.")
        }

        return result

    }

    getTaskByIdOrStatus = async (input: getTasksInputDTO) => {
        const { token, id, done } = input

        if (!token) {
            throw new CustomError(422, "Please login")
        }

        const tokenData = this.authenticator.getTokenData(token)
        if (!tokenData) {
            throw new CustomError(422, "Invalid token.")
        }

        const userId = tokenData.id

        if (done) {

            let status: boolean

            const validateStatus = stringToDone(done.toUpperCase())

            const validateDone = booleanToDone(validateStatus, status)

            const statusTask = await this.taskData.getTaskByStatus(validateDone, userId)
            

            if (!statusTask) {
                throw new CustomError(404, "Task not found.")
            }

            return statusTask
        }

        if (id) {
            const task = await this.taskData.getTaskByUser(id, userId)
            if (!task) {
                throw new CustomError(404, "Task not found.")
            }
            return task
        }

        if (!done && !id) {
            throw new CustomError(422, "Please let us know what you want to update.")

        }

    }

    updateTask = async (input: UpdateTaskInputDTO) => {
        const { token, id, title, done, date, } = input

        if (!token) {
            throw new CustomError(422, "Please login")
        }

        if (!id) {
            throw new CustomError(422, "Please enter the parameter id")
        }

        const tokenData = this.authenticator.getTokenData(token)
        if (!tokenData) {
            throw new CustomError(422, "Invalid token.")
        }

        const userId = tokenData.id

        const task = await this.taskData.getTaskById(id)
        if (!task) {
            throw new CustomError(404, "Task not found.")
        }

        const checkTaskUser = await this.taskData.getTaskByUser(id, userId)
        if (!checkTaskUser) {
            throw new CustomError(401, "User unauthorized ")
        }

        if (title) {
            await this.taskData.updateTaskTitle(id, title)
        }

        if (done) {
            let status: boolean
            const validateStatus = stringToDone(done.toUpperCase())

            const validateDone = booleanToDone(validateStatus, status)

            await this.taskData.updateTaskStatus(id, validateDone)
        }

        if (date) {

            const taskDate = this.dateFormat.formatPT(date) as Date
            await this.taskData.updateTaskDate(id, taskDate)

        }

        if (!title && !done && !date) {
            throw new CustomError(422, "Please let us know what you want to update.")

        }

        const accessToken = this.authenticator.generateToken({ id: userId })

        return accessToken
    }

    deleteTask = async (input: deleteTaskInputDTO) => {
        const { token, id } = input

        if (!token) {
            throw new CustomError(422, "Please login")
        }

        const tokenData = this.authenticator.getTokenData(token)
        if (!tokenData) {
            throw new CustomError(422, "Invalid token.")
        }

        const userId = tokenData.id

        const task = await this.taskData.getTaskById(id)
        if (!task) {
            throw new CustomError(404, "Task not found.")
        }

        const checkTaskUser = await this.taskData.getTaskByUser(id, userId)
        if (!checkTaskUser) {
            throw new CustomError(401, "User unauthorized ")
        }

        await this.taskData.deleteTaskById(id)

        const taskCheck = await this.taskData.getTaskById(id)
        if (taskCheck) {
            throw new CustomError(412, "Precondition failed")
        }
    }
}