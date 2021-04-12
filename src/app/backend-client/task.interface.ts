export interface Task {
    id?: number,
    title: string,
    description?: string,
    status?: Status,
    creationTimestamp?: number,
    modificationTimestamp?: number
}

export enum Status {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}
