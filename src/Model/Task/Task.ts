export class Task {
    constructor(
        private id: string,
        private createdAt: Date,
        private title: string,
        private done: boolean,
        private date: Date,
        private authorId: string
    ) { }

    getId() {
        return this.id;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    geTitle() {
        return this.title
    }
    getDone() {
        return this.done
    }
    getDate() {
        return this.date
    }
    getAuthorId() {
        return this.authorId
    }

    setTitle(title: string) {
        this.title = title
    }
    setDate(date: Date) {
        this.date = date
    }
    setDone(done: boolean) {
        this.done = done
    }

    static toTaskModel(task: any): Task {
        return new Task(task.id, task.createdAt, task.title, task.done, task.date, task.authorId)
    }

}

export enum Done {
    TRUE = "TRUE",
    FALSE = "FALSE"
}

export const stringToDone = (input: string): Done => {
    switch (input) {
        case "TRUE":
            return Done.TRUE;
        case "FALSE":
            return Done.FALSE;
        default:
            throw new Error('Invalid status, insert "TRUE" or "FALSE" ');
    }
}
export const booleanToDone = (input: string, status: boolean) => {
    switch (input) {
        case "TRUE":
            return status = true
        case "FALSE":
            return status = false
        default:
            throw new Error("Invalid status");
    }
}


export type TaskInputDTO = {
    token: string;
    title: string;
    done: Done;
    date: Date;
}

export type UpdateTaskInputDTO = {
    token: string;
    id: string;
    title: string;
    done: Done;
    date: Date;
}

export type deleteTaskInputDTO = {
    token: string;
    id: string;
}

export type getTasksInputDTO = {
    token: string;
    id: string;
    done: Done;
}


