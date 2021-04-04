import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NotificationAreaComponent } from './notification-area/notification-area.component'
import { NotificationService } from './notification.service'

@NgModule({
  declarations: [
    NotificationAreaComponent
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
