import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'project-management-front';

  createTaskModalActive = false;

  openCreateTaskModal() {
    this.createTaskModalActive = true
  }
}
