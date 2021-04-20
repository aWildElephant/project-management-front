import { Component, Input, OnChanges, OnInit } from '@angular/core'

import { Task, Status } from '../backend-client/task.interface'
import { EventService } from '../event/event.service'
import { TaskService } from '../backend-client/task.service'
import { TaskDeletedEvent, TaskDeletionFailedEvent, TaskStatusChangedEvent, TaskStatusChangeFailedEvent } from '../event/event.interface'

@Component({
  selector: 'app-backlog-item',
  templateUrl: './backlog-item.component.html',
  styleUrls: ['./backlog-item.component.sass']
})
export class BacklogItemComponent {

  taskStatus = Status

  @Input() task?: Task

  constructor(private eventService: EventService, private taskService: TaskService) { }

  deleteTask(): void {
    const taskId = this.task?.id
    if (taskId) {
      this.taskService.delete(taskId)
        .then(() => {
          this.eventService.submit(new TaskDeletedEvent(taskId))
        })
        .catch(() => {
          this.eventService.submit(new TaskDeletionFailedEvent(taskId))
        })
    }
  }

  updateTaskStatus(status: Status): void {
    const taskId = this.task?.id
    const previousStatus = this.task?.status
    if (taskId) {
      this.taskService.updateStatus(taskId, status)
        .then(() => {
          this.eventService.submit(new TaskStatusChangedEvent(taskId, previousStatus, status))
        })
        .catch(() => {
          this.eventService.submit(new TaskStatusChangeFailedEvent(taskId))
        })
    }
  }
}
