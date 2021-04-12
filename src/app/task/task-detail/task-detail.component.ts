import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { NotificationService } from '../../notification/notification.service'
import { Task } from '../../backend-client/task.interface'
import { TaskService } from '../..//backend-client/task.service'

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.sass']
})
export class TaskDetailComponent implements OnInit {

  task?: Task

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getTask(params && params.id))
  }

  private getTask(id: number): void {
    this.taskService.get(id)
      .then(task => {
        if (task) {
          this.task = task
        } else {
          this.displayErrorAndGoToBacklog(id)
        }
      })
      .catch(() => {
        this.displayErrorAndGoToBacklog(id)
      })
  }

  private displayErrorAndGoToBacklog(id: number): void {
    this.notificationService.error('Échec du chargement', `Impossible d'afficher le détail de la tâche #${id}`)
    this.router.navigate([''])
  }
}
