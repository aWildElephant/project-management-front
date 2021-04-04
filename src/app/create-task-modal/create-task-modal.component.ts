import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { Modal } from 'bootstrap'

import { TaskService } from '../backend-client/task.service'
import { NotificationService } from '../notification/notification.service'

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

  constructor(private notificationService: NotificationService, private taskService: TaskService) {
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
      this.notificationService.info('Succès', `La tâche #${task.id} a été créée`)
    }).catch(error => {
      console.error(error)
      this.notificationService.error('Erreur', 'La tâche n\'a pas pu être créée')
    })
  }

  clearFields(): void {
    this.title = ''
    this.description = undefined
  }
}
