import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Task } from '../../backend-client/task.interface'
import { TaskService } from '../../backend-client/task.service'
import { EventService } from 'src/app/event/event.service'
import { GetTaskFailedEvent } from 'src/app/event/event.interface'

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
    private eventService: EventService,
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
    this.eventService.submit(new GetTaskFailedEvent(id))
    this.router.navigate([''])
  }
}
