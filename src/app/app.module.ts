import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CreateTaskModalComponent } from './create-task-modal/create-task-modal.component'
import { NotificationModule } from './notification/notification.module'
import { FormsModule } from '@angular/forms'
import { BackendClientModule } from './backend-client/backend-client.module'

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskModalComponent
  ],
  imports: [
    AppRoutingModule,
    BackendClientModule,
    BrowserModule,
    FormsModule,
    NotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
