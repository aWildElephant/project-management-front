import { Component, OnInit } from '@angular/core'

import { Task } from '../backend-client/task.interface'
import { TaskService } from '../backend-client/task.service'

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.sass']
})
export class BacklogComponent implements OnInit {

  tasks?: Task[]

  constructor(private taskService: TaskService) { }

  async ngOnInit(): Promise<void> {
    this.tasks = await this.taskService.list()
  }
}
