import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { Modal } from 'bootstrap'

import { TaskService } from '../backend-client/task.service'
import { TaskCreatedEvent, TaskCreationFailedEvent } from '../event/event.interface'
import { EventService } from '../event/event.service'

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.sass']
})
export class CreateTaskModalComponent implements OnInit, OnChanges {

  @Input() active = false
  @Output() activeChange = new EventEmitter<boolean>()

  modal?: Modal
  title = ''
  description?: string

  constructor(private eventService: EventService, private taskService: TaskService) {
  }

  ngOnInit(): void {
    const modalElement = document.getElementById('createTaskModal')

    if (modalElement != null) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.activeChange.emit(false)
      })

      this.modal = new Modal(modalElement)
    }
  }

  ngOnChanges(): void {
    if (this.active) {
      this.modal?.show()
    }
  }

  submit(): void {
    this.modal?.hide()
    this.taskService.create({
      title: this.title,
      description: this.description
    }).then(task => {
      this.clearFields()
      this.eventService.submit(new TaskCreatedEvent(task.id))
    }).catch(error => {
      this.eventService.submit(new TaskCreationFailedEvent())
    })
  }

  clearFields(): void {
    this.title = ''
    this.description = undefined
  }
}
