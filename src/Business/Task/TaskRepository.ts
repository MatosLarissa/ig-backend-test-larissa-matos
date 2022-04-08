import { Task } from "../../Model/Task/Task"

export interface TaskRepository {
    createTask(task: Task): Promise<Task>
    getAllTaskByUser(id: string): Promise<Task | null>
    getTaskByStatus(done: boolean, userId: string): Promise<Task | null>
    getAllTaskByUser(id: string): Promise<Task | null>
}