import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationAreaComponent } from './notification-area/notification-area.component';
import { NotificationComponent } from './notification/notification.component';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationService } from './notification.service';

@NgModule({
  declarations: [
    NotificationAreaComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificationAreaComponent
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationModule { }
