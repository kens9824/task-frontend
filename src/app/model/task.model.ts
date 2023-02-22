export interface Task {
    id?: number,
    taskName: String,
    taskAssign: String,
    status: keyof State,
    last_updated?: Date,
    timestamp?: Date
}

export interface State {
     Todo : Task[],
     Done : Task[],
     Doing : Task[],
}

export interface Payload {
    status: keyof State
    data: Task
}