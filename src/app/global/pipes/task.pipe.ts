import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskPipe',
  standalone: true,
})
export class TaskPipe implements PipeTransform {
  transform(value: string): string {
    const statusMappings: { [key: string]: string } = {
      stand_by: 'Standby',
      in_progress: 'In Progress',
      backLog: 'backLog',
      completed: 'Completed',
    };

    const mappedStatus = statusMappings[value.toLowerCase()];
    return mappedStatus || value;
  }
}
