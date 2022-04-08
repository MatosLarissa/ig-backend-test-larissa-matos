import { TaskRepository } from "../../Business/Task/TaskRepository";
import { CustomError } from "../../Error/CustomError";
import { Task } from "../../Model/Task/Task";
import { BaseDatabase } from "../BaseDatabase";


export default class TaskDatabase extends BaseDatabase implements TaskRepository {
    protected TABLE_NAME = "Task"

    createTask = async (task: Task) => {
        try {
            const result: Task[] = await BaseDatabase
                .connection(this.TABLE_NAME)
                .insert({
                    "id": task.getId(),
                    "created_at": task.getCreatedAt(),
                    "title": task.geTitle(),
                    "done": task.getDone(),
                    "date": task.getDate(),
                    "author_id": task.getAuthorId(),
                })
            return result[0] && Task.toTaskModel(result[0])
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            } error.sqlMessage
        }
    }

    getAllTaskByUser = async (id: string) => {
        try {
            const result: any = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where({ author_id: id })
            return result
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
        await BaseDatabase.destroyConnection()
    }

    getTaskByStatus = async (done: boolean, userId: string) => {
        try {
            const result: any = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where({ done: done, author_id: userId })
            return result
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            } error.sqlMessage
        }
    }
}