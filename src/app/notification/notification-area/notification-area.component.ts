import { Component, OnInit } from '@angular/core'
import { Toast } from 'bootstrap'
import { AppNotification, AppNotificationLevel } from '../notification.interface'
import { EventService } from 'src/app/event/event.service'
import { GetTaskFailedEvent, TaskCreatedEvent, TaskCreationFailedEvent, TaskDeletedEvent, TaskDeletionFailedEvent, TaskStatusChangedEvent, TaskStatusChangeFailedEvent } from 'src/app/event/event.interface'
import { TaskStatusPipe } from 'src/app/task/task-status.pipe'

@Component({
  selector: 'app-notification-area',
  templateUrl: './notification-area.component.html',
  styleUrls: ['./notification-area.component.sass']
})
export class NotificationAreaComponent implements OnInit {

  private toast?: Toast
  private shown = false

  lastNotification?: AppNotification
  nextNotification?: AppNotification

  constructor(private eventService: EventService, private taskStatusPipe: TaskStatusPipe) { }

  ngOnInit(): void {
    const toastElement = document.getElementById('lastNotificationToast')

    if (toastElement != null) {
      this.toast = new Toast(toastElement, {
        animation: true,
        delay: 5000
      })

      toastElement.addEventListener('shown.bs.toast', this.toastShown)
      toastElement.addEventListener('hidden.bs.toast', this.toastHidden)
    }

    this.eventService.subscribeToTaskCreated(event => this.handleTaskCreated(event))
    this.eventService.subscribeToTaskCreationFailed(event => this.handleTaskCreationFailed(event))
    this.eventService.subscribeToTaskDeleted(event => this.handleTaskDeleted(event))
    this.eventService.subscribeToTaskDeletionFailed(event => this.handleTaskDeletionFailed(event))
    this.eventService.subscribeToTaskStatusChanged(event => this.handleTaskStatusChanged(event))
    this.eventService.subscribeToTaskStatusChangeFailed(event => this.handleTaskStatusChangeFailed(event))
    this.eventService.subscribeToGetTaskOperationFailed(event => this.handleGetTaskOperationFailed(event))
  }

  private handleTaskCreated(event: TaskCreatedEvent): void {
    this.handle({
      level: AppNotificationLevel.INFO,
      message: 'T??che cr????e',
      description: `La t??che ${event.id} a ??t?? cr????e`
    })
  }

  private handleTaskCreationFailed(event: TaskCreationFailedEvent): void {
    this.handle({
      level: AppNotificationLevel.ERROR,
      message: '??chec de la cr??ation de la t??che',
      description: `La t??che n'a pas pu ??tre cr????e`
    })
  }

  private handleTaskDeleted(event: TaskDeletedEvent): void {
    this.handle({
      level: AppNotificationLevel.INFO,
      message: 'T??che supprim??e',
      description: `La t??che ${event.id} a ??t?? supprim??e`
    })
  }

  private handleTaskDeletionFailed(event: TaskDeletionFailedEvent): void {
    this.handle({
      level: AppNotificationLevel.ERROR,
      message: '??chec de la suppression de la t??che',
      description: `La t??che n'a pas pu ??tre supprim??e`
    })
  }

  private handleTaskStatusChanged(event: TaskStatusChangedEvent): void {
    this.handle({
      level: AppNotificationLevel.INFO,
      message: 'Statut mis ?? jour',
      description: `Le nouveau statut de la t??che ${event.id} est  '${this.taskStatusPipe.transform(event.newStatus)}'`
    })
  }

  private handleTaskStatusChangeFailed(event: TaskStatusChangeFailedEvent): void {
    this.handle({
      level: AppNotificationLevel.ERROR,
      message: '??chec du changement de statut',
      description: `Le statut de la t??che ${event.id} n'a pas pu ??tre mis ?? jour`
    })
  }

  private handleGetTaskOperationFailed(event: GetTaskFailedEvent): void {
    this.handle({
      level: AppNotificationLevel.ERROR,
      message: '??chec de la r??cup??ration de la t??che',
      description: `Impossible d'afficher le d??tail de la t??che #${event.wantedId}`
    })
  }

  private handle(notification: AppNotification): void {
    this.nextNotification = notification

    if (this.shown) {
      this.toast?.hide()
    } else {
      this.showNextNotification()
    }
  }

  private toastShown(): void {
    this.shown = true
  }

  private toastHidden(): void {
    this.shown = false

    if (this.nextNotification) {
      this.showNextNotification()
    }
  }

  private showNextNotification(): void {
    this.lastNotification = this.nextNotification
    this.nextNotification = undefined

    this.toast?.show()
  }
}
