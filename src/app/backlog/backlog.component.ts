import { Component, OnInit } from '@angular/core'

import { Status, Task } from '../backend-client/task.interface'
import { TaskService } from '../backend-client/task.service'

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.sass']
})
export class BacklogComponent implements OnInit {

  openTasks: Task[] = []
  inProgressTasks: Task[] = []
  doneTasks: Task[] = []

  constructor(private taskService: TaskService) { }

  async ngOnInit(): Promise<void> {
    const tasks = await this.taskService.list()

    const openTasks: Task[] = []
    const inProgressTasks: Task[] = []
    const doneTasks: Task[] = []

    for (const task of tasks) {
      switch (task.status) {
        case Status.OPEN:
          openTasks.push(task)
          break
        case Status.IN_PROGRESS:
          inProgressTasks.push(task)
          break
        case Status.DONE:
          doneTasks.push(task)
          break
        default:
          console.warn(`Invalid task status ${task.status}`)
      }
    }

    this.openTasks = openTasks
    this.inProgressTasks = inProgressTasks
    this.doneTasks = doneTasks
  }
}
