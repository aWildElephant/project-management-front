import { Component, Input, OnInit } from '@angular/core'

import { Task } from '../backend-client/task.interface'

@Component({
  selector: 'app-backlog-item',
  templateUrl: './backlog-item.component.html',
  styleUrls: ['./backlog-item.component.sass']
})
export class BacklogItemComponent implements OnInit {

  @Input() task?: Task

  constructor() { }

  ngOnInit(): void {
  }

}
