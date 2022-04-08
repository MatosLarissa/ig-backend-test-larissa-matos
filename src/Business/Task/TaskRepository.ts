import { Task } from "../../Model/Task/Task"

export interface TaskRepository {
    createTask(task: Task): Promise<Task>
    getAllTaskByUser(id: string): Promise<Task | null>
}