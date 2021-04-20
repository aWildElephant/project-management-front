import { Component, OnInit } from '@angular/core'
import { Toast } from 'bootstrap'
import { AppNotification, AppNotificationLevel } from '../notification.interface'
import { EventService } from 'src/app/event/event.service'
import { GetTaskFailedEvent, TaskCreatedEvent, TaskCreationFailedEvent, TaskDeletedEvent, TaskDeletionFailedEvent, TaskStatusChangedEvent, TaskStatusChangeFailedEvent } from 'src/app/event/event.interface'

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

  constructor(private eventService: EventService) { }

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
      message: 'Tâche créée',
      description: `La tâche ${event.id} a été créée`
    })
  }

  private handleTaskCreationFailed(event: TaskCreationFailedEvent): void {
    this.handle({
      level: AppNotificationLevel.ERROR,
      message: 'Échec de la création de la tâche',
      description: `La tâche n'a pas pu être créée`
    })
  }

  private handleTaskDeleted(event: TaskDeletedEvent): void {
    this.handle({
      level: AppNotificationLevel.INFO,
      message: 'Tâche supprimée',
      description: `La tâche ${event.id} a été supprimée`
    })
  }

  private handleTaskDeletionFailed(event: TaskDeletionFailedEvent): void {
    this.handle({
      level: AppNotificationLevel.ERROR,
      message: 'Échec de la suppression de la tâche',
      description: `La tâche n'a pas pu être supprimée`
    })
  }

  private handleTaskStatusChanged(event: TaskStatusChangedEvent): void {
    this.handle({
      level: AppNotificationLevel.INFO,
      message: 'Statut mis à jour',
      description: `Le statut de la tâche ${event.id} a été changé de ${event.previousStatus} à ${event.newStatus}`
    })
  }

  private handleTaskStatusChangeFailed(event: TaskStatusChangeFailedEvent): void {
    this.handle({
      level: AppNotificationLevel.ERROR,
      message: 'Échec du changement de statut',
      description: `Le statut de la tâche ${event.id} n'a pas pu être mis à jour`
    })
  }

  private handleGetTaskOperationFailed(event: GetTaskFailedEvent): void {
    this.handle({
      level: AppNotificationLevel.ERROR,
      message: 'Échec de la récupération de la tâche',
      description: `Impossible d'afficher le détail de la tâche #${event.wantedId}`
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
