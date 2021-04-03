import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { AppNotification } from '../notification.interface';

@Component({
  selector: 'app-notification-area',
  templateUrl: './notification-area.component.html',
  styleUrls: ['./notification-area.component.sass']
})
export class NotificationAreaComponent implements OnInit {

  notifications: AppNotification[] = []

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.subscribe((notification) => this.stackNotification(notification))
  }

  stackNotification(notification: AppNotification) {
    this.notifications.push(notification)
  }
}
