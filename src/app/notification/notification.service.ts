import { Injectable } from '@angular/core'
import { EventEmitter } from '@angular/core'

import { AppNotification, AppNotificationLevel } from './notification.interface'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private bus: EventEmitter<AppNotification> = new EventEmitter<AppNotification>(true)

  constructor() { }

  info(message: string, description: string): void {
    this.bus.emit({
      level: AppNotificationLevel.INFO,
      message: message,
      description: description
    })
  }

  error(message: string, description: string): void {
    this.bus.emit({
      level: AppNotificationLevel.ERROR,
      message: message,
      description: description
    })
  }

  subscribe(callback: (notification: AppNotification) => void): void {
    this.bus.subscribe(callback)
  }
}
