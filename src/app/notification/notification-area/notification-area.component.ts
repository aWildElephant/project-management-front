import { Component, OnInit } from '@angular/core'
import { Toast } from 'bootstrap'
import { NotificationService } from '../notification.service'
import { AppNotification } from '../notification.interface'

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

  constructor(private notificationService: NotificationService) { }

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

    this.notificationService.subscribe(notification => this.handle(notification))
  }

  handle(notification: AppNotification): void {
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
