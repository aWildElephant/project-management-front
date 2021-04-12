import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BackendClientModule } from './backend-client.module'
import { Status, Task } from './task.interface'

@Injectable({
  providedIn: BackendClientModule
})
export class TaskService {

  constructor(private client: HttpClient) { }

  create(task: Task): Promise<Task> {
    return this.client.post<Task>('http://localhost:3000/task', task).toPromise()
  }

  get(identifier: number): Promise<Task> {
    return this.client.get<Task>(`http://localhost:3000/task/${identifier}`).toPromise()
  }

  updateStatus(identifier: number, newStatus: Status): Promise<void> {
    return this.client.put(
      `http://localhost:3000/task/${identifier}/status`,
      { status: newStatus },
      { responseType: 'text' }
    ).toPromise().then()
  }

  delete(identifier: number): Promise<void> {
    return this.client.delete(`http://localhost:3000/task/${identifier}`, { responseType: 'text' }).toPromise().then()
  }

  list(): Promise<Task[]> {
    return this.client.get<Task[]>('http://localhost:3000/task/list').toPromise()
  }
}
