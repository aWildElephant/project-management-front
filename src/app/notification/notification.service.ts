import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AppNotification } from './notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private bus: EventEmitter<AppNotification> = new EventEmitter<AppNotification>(true);

  constructor() { }

  warning(message: string, description: string) {
    this.bus.emit({
      message: message,
      description: description 
    })
  }

  subscribe(callback: (notification: AppNotification) => void) {
    this.bus.subscribe(callback)
  }
}
