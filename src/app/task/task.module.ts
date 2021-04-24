import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TaskDetailComponent } from './task-detail/task-detail.component'
import { RouterModule } from '@angular/router'
import { TaskDetailSidebarComponent } from './task-detail-sidebar/task-detail-sidebar.component'
import { TaskStatusPipe } from './task-status.pipe'

@NgModule({
  declarations: [
    TaskDetailComponent,
    TaskDetailSidebarComponent,
    TaskStatusPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TaskDetailComponent
  ],
  providers: [
    TaskStatusPipe
  ]
})
export class TaskModule { }
