import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendClientModule } from './backend-client.module';
import { Task } from './task.interface'

@Injectable({
  providedIn: BackendClientModule
})
export class TaskService {

  constructor(private client: HttpClient) { }

  create(task: Task): Promise<Task> {
    return this.client.post<Task>("http://localhost:3000/task", task).toPromise()
  }

  get(identifier: number): Promise<Task> {
    return this.client.get<Task>(`http://localhost:3000/task/${identifier}`).toPromise()
  }
}
