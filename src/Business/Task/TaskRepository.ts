import { Task } from "../../Model/Task/Task"

export interface TaskRepository {
    createTask(task: Task): Promise<Task>
    getAllTaskByUser(id: string): Promise<Task | null>
    getTaskByStatus(done: boolean, userId: string): Promise<Task | null>
    getTaskByUser(id: string, userId: string): Promise<Task | null>
    getTaskById(id: string): Promise<Task | null>
    updateTaskTitle(id: string, title: string): Promise<Task | null>
    updateTaskStatus(id: string, done: boolean): Promise<Task | null>
    updateTaskDate(id: string, data: Date): Promise<Task | null>
}