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

    getTaskByUser = async (id: string, userId: string) => {
        try {
            const queryResult: any = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where({ id, author_id: userId })
            if (queryResult[0]) {
                const result = new Task(
                    queryResult[0].id,
                    queryResult[0].created_at,
                    queryResult[0].title,
                    queryResult[0].done,
                    queryResult[0].date,
                    queryResult[0].author_id
                )
                return result
            } else {
                return null
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
        await BaseDatabase.destroyConnection()

    }

    getTaskById = async (id: string) => {
        try {
            const queryResult: any = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where({ id })
            if (queryResult[0]) {
                const result = new Task(
                    queryResult[0].id,
                    queryResult[0].created_at,
                    queryResult[0].title,
                    queryResult[0].done,
                    queryResult[0].date,
                    queryResult[0].author_id
                )
                return result
            } else {
                return null
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
        await BaseDatabase.destroyConnection()

    }

    updateTaskTitle = async (id: string, title: string) => {
        try {
            const result = await BaseDatabase
                .connection(this.TABLE_NAME)
                .update({
                    title
                })
                .where({ id })
            return result[0] && Task.toTaskModel(result[0])
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
        await BaseDatabase.destroyConnection()
    }
}