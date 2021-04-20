import { Status } from '../backend-client/task.interface'

export enum EventType {
    TaskCreationSuccess = 'task.creation.success',
    TaskCreationFailure = 'task.creation.failure',
    TaskDeletionSuccess = 'task.deletion.success',
    TaskDeletionFailure = 'task.deletion.failure',
    TaskStatusChangeSuccess = 'task.status.change.success',
    TaskStatusChangeFailure = 'task.status.change.failure',
    TaskGetOperationFailure = 'task.get.failure'
}

export interface Event {
    type: EventType
}

export class TaskCreatedEvent implements Event {

    type = EventType.TaskCreationSuccess

    constructor(public id?: number) {}
}

export class TaskCreationFailedEvent implements Event {

    type = EventType.TaskCreationFailure
}

export class TaskDeletedEvent implements Event {

    type = EventType.TaskDeletionSuccess

    constructor(public id: number) {}
}

export class TaskDeletionFailedEvent implements Event {

    type = EventType.TaskDeletionFailure

    constructor(public id: number) {}
}

export class TaskStatusChangedEvent implements Event {

    type = EventType.TaskStatusChangeSuccess

    constructor(public id: number, public previousStatus: Status | undefined, public newStatus: Status) {}
}

export class TaskStatusChangeFailedEvent implements Event {

    type = EventType.TaskStatusChangeFailure

    constructor(public id: number) {}
}

export class GetTaskFailedEvent implements Event {

    type = EventType.TaskGetOperationFailure

    constructor(public wantedId: number) {}
}
