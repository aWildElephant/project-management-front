import { Component, Input, OnInit } from '@angular/core'

import { Task } from '../backend-client/task.interface'
import { TaskService } from '../backend-client/task.service'
import { NotificationService } from '../notification/notification.service'

@Component({
  selector: 'app-backlog-item',
  templateUrl: './backlog-item.component.html',
  styleUrls: ['./backlog-item.component.sass']
})
export class BacklogItemComponent {

  @Input() task?: Task

  constructor(private taskService: TaskService, private notificationService: NotificationService) { }

  deleteTask(): void {
    const taskId = this.task?.id
    if (taskId) {
      this.taskService.delete(taskId)
        .then(() => {
          this.notificationService.info('Tâche supprimée', `La tâche ${taskId} a été supprimée`)
        })
        .catch(() => {
          this.notificationService.error('Échec de la suppression', `Erreur lors de la suppression de la tâche ${taskId}`)
        })
    }
  }
}
