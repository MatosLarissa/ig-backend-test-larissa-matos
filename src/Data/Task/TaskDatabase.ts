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
}