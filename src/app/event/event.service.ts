import { EventEmitter, Injectable } from '@angular/core'
import { Event, EventType, GetTaskFailedEvent, TaskCreatedEvent, TaskCreationFailedEvent, TaskDeletedEvent, TaskDeletionFailedEvent, TaskStatusChangedEvent, TaskStatusChangeFailedEvent } from './event.interface'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private emitters: Map<EventType, EventEmitter<Event>>

  constructor() {
    this.emitters = new Map()
    this.setEmitter(EventType.TaskCreationSuccess)
    this.setEmitter(EventType.TaskCreationFailure)
    this.setEmitter(EventType.TaskDeletionSuccess)
    this.setEmitter(EventType.TaskDeletionFailure)
    this.setEmitter(EventType.TaskStatusChangeSuccess)
    this.setEmitter(EventType.TaskStatusChangeFailure)
    this.setEmitter(EventType.TaskGetOperationFailure)
  }

  private setEmitter(eventType: EventType): void {
    this.emitters.set(eventType, new EventEmitter())
  }

  submit(event: Event): void {
    this.emitter(event.type)?.emit(event)
  }

  subscribeToTaskCreated(callback: (event: TaskCreatedEvent) => void): void {
    this.emitter(EventType.TaskCreationSuccess)?.subscribe(callback)
  }

  subscribeToTaskCreationFailed(callback: (event: TaskCreationFailedEvent) => void): void {
    this.emitter(EventType.TaskCreationFailure)?.subscribe(callback)
  }

  subscribeToTaskDeleted(callback: (event: TaskDeletedEvent) => void): void {
    this.emitter(EventType.TaskDeletionSuccess)?.subscribe(callback)
  }

  subscribeToTaskDeletionFailed(callback: (event: TaskDeletionFailedEvent) => void): void {
    this.emitter(EventType.TaskDeletionFailure)?.subscribe(callback)
  }

  subscribeToTaskStatusChanged(callback: (event: TaskStatusChangedEvent) => void): void {
    this.emitter(EventType.TaskStatusChangeSuccess)?.subscribe(callback)
  }

  subscribeToTaskStatusChangeFailed(callback: (event: TaskStatusChangeFailedEvent) => void): void {
    this.emitter(EventType.TaskStatusChangeFailure)?.subscribe(callback)
  }

  subscribeToGetTaskOperationFailed(callback: (event: GetTaskFailedEvent) => void): void {
    this.emitter(EventType.TaskGetOperationFailure)?.subscribe(callback)
  }

  private emitter(eventType: EventType): EventEmitter<Event> | undefined {
    return this.emitters.get(eventType)
  }
}
