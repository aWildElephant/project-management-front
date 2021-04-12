import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TaskDetailComponent } from './task-detail/task-detail.component'
import { RouterModule } from '@angular/router'



@NgModule({
  declarations: [TaskDetailComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TaskDetailComponent
  ],
})
export class TaskModule { }
