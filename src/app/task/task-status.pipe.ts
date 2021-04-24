import { Pipe, PipeTransform } from '@angular/core'
import { Status } from '../backend-client/task.interface'

@Pipe({ name: 'taskStatus' })
export class TaskStatusPipe implements PipeTransform {
    transform(status?: Status): string {
        switch (status) {
            case Status.OPEN:
                return 'à faire'
            case Status.IN_PROGRESS:
                return 'en cours'
            case Status.DONE:
                return 'terminé'
            default:
                return '?'
        }
    }
}
