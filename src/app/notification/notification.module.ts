import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NotificationAreaComponent } from './notification-area/notification-area.component'

@NgModule({
  declarations: [
    NotificationAreaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificationAreaComponent
  ]
})
export class NotificationModule { }
