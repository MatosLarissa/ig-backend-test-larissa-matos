import { IdGenerator } from "../../Services/IdGenerator";
import { Authenticator } from "../../Services/Authenticator";
import { CustomError } from "../../Error/CustomError";
import { booleanToDone, stringToDone, Task, TaskInputDTO} from "../../Model/Task/Task";
import { TaskRepository } from "./TaskRepository";


export default class TaskBusiness {

    private taskData: TaskRepository
    private idGenerator: IdGenerator
    private authenticator: Authenticator



    constructor(taskDataImplementation: TaskRepository) {

        this.taskData = taskDataImplementation
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
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

        let status: boolean

        const validateStatus = stringToDone(done.toUpperCase())

        const validateDone = booleanToDone(validateStatus, status)

        const id = this.idGenerator.generate()

        const task = new Task(
            id,
            dateCreated,
            title,
            validateDone,
            date,
            userId
        )

        await this.taskData.createTask(task)

        const accessToken = this.authenticator.generateToken({ id: userId })

        return accessToken
    }
}