import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalModule } from '../../../global/global.module';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { TaskService } from '../../../global/services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { Task } from '../../../global/interfaces/task.interface';
import { TaskPipe } from '../../../global/pipes/task.pipe';
import { FormsModule } from '@angular/forms';
import { User } from '../../../global/interfaces/user.interfaces';
import { UserService } from '../../../global/services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-list',
  standalone: true,
  providers: [TaskService, UserService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [
    CommonModule,
    GlobalModule,
    HttpClientModule,
    TaskPipe,
    FormsModule,
  ],
})
export class ListComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private primengConfig: PrimeNGConfig,
    private userservices: UserService
  ) {}

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  tasks: Task[] = [];
  visible: boolean = false;
  users: User[] = [];

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.userservices.getUsers().subscribe((user) => {
      this.users = user;
    });

    this.items = [
      { label: 'All', icon: 'pi pi-fw pi-inbox' },
      { label: 'BackLog', icon: 'pi pi-fw pi-pencil' },
      { label: 'In Progres', icon: 'pi pi-play' },
      { label: 'Completed', icon: 'pi pi-fw pi-check-circle' },
      { label: 'Standby', icon: 'pi pi-fw pi-pause' },
    ];

    this.activeItem = this.items[0];
    this.loadTasks();
  }

  onActiveItemChange(e: MenuItem) {
    this.filter(e);
  }

  filter(e: MenuItem) {
    const statusValue = this.getStatusValue(e);

    this.taskService.listTask(statusValue).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  private getStatusValue(e: MenuItem) {
    const status = {
      ALL: 'ALL',
      BackLog: 'backLog',
      Standby: 'stand_by',
      Completed: 'completed',
      'In Progres': 'in_progress',
    };

    if (e.label !== undefined) {
      return status[e.label as keyof typeof status] || 'ALL';
    }

    return 'ALL';
  }

  loadTasks() {
    this.taskService.listTask().subscribe((task) => (this.tasks = task));
  }

  showDialog() {
    this.visible = true;
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.refreshTaskList();
        alert(`The Task with id: ${id} was deleted`);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  refreshTaskList() {
    this.taskService.listTask().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
