import { Pipe, PipeTransform } from '@angular/core'
import { Status } from '../backend-client/task.interface'

@Pipe({ name: 'taskStatus' })
export class TaskStatusPipe implements PipeTransform {
    transform(status?: Status): string {
        switch (status) {
            case Status.OPEN:
                return 'À faire'
            case Status.IN_PROGRESS:
                return 'En cours'
            case Status.DONE:
                return 'Terminé'
            default:
                return '-'
        }
    }
}
