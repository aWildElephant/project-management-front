import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Modal } from 'bootstrap';
import { TaskService } from '../backend-client/task.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.sass']
})
export class CreateTaskModalComponent implements OnInit {

  @Input() active: boolean = false;
  @Output() activeChange = new EventEmitter<boolean>();

  modal?: Modal
  title: string = ""
  description?: string

  constructor(private notificationService: NotificationService, private taskService: TaskService) {
  }

  ngOnInit() {
    const modalElement = document.getElementById("createTaskModal");

    if (modalElement != null) {
      modalElement.addEventListener("hidden.bs.modal", () => {
        this.activeChange.emit(false)
      })

      this.modal = new Modal(modalElement)
    }
  }

  ngOnChanges() {
    if (this.active) {
      this.modal?.show()
    }
  }

  submit() {
    this.modal?.hide()
    console.log("Title:%s, description:%s", this.title, this.description)
    this.taskService.create({
      title: this.title,
      description: this.description
    }).then(() => {
      this.clearFields()
      this.notificationService.info("Succès", "La tâche a été créée")
    }).catch(() => {
      this.notificationService.error("Erreur", "La tâche n'a pas pu être créée")
    })
  }

  clearFields() {
    this.title = ""
    this.description = undefined
  }
}
