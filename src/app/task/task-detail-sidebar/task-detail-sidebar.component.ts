import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { TaskService } from 'src/app/backend-client/task.service'
import { TaskDeletedEvent, TaskDeletionFailedEvent } from 'src/app/event/event.interface'
import { Task } from '../../backend-client/task.interface'
import { EventService } from '../../event/event.service'

@Component({
  selector: 'app-task-detail-sidebar',
  templateUrl: './task-detail-sidebar.component.html',
  styleUrls: ['./task-detail-sidebar.component.sass']
})
export class TaskDetailSidebarComponent {

  @Input()
  task?: Task

  constructor(private eventService: EventService, private taskService: TaskService, private router: Router) { }

  deleteTask(): void {
    const taskId = this.task?.id

    if (taskId) {
      this.taskService.delete(taskId)
        .then(() => {
          this.eventService.submit(new TaskDeletedEvent(taskId))
          this.router.navigate([''])
        })
        .catch(() => this.eventService.submit(new TaskDeletionFailedEvent(taskId)))
    }
  }
}
