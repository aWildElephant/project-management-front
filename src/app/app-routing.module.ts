import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { BacklogComponent } from './backlog/backlog.component'
import { TaskDetailComponent } from './task/task-detail/task-detail.component'

const routes: Routes = [
  { path: 'task/:id', component: TaskDetailComponent },
  { path: '', component: BacklogComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
