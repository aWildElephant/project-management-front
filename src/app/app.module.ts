import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CreateTaskModalComponent } from './create-task-modal/create-task-modal.component'
import { NotificationModule } from './notification/notification.module'
import { FormsModule } from '@angular/forms'
import { BackendClientModule } from './backend-client/backend-client.module'
import { BacklogComponent } from './backlog/backlog.component'
import { BacklogItemComponent } from './backlog-item/backlog-item.component'
import { TaskModule } from './task/task.module'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskModalComponent,
    BacklogComponent,
    BacklogItemComponent
  ],
  imports: [
    AppRoutingModule,
    BackendClientModule,
    BrowserModule,
    FormsModule,
    NotificationModule,
    RouterModule,
    TaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
