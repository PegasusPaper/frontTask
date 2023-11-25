import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { readLocalStorage } from '../helpers/utils';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl: string = 'http://localhost:3500/api/task';
  genericUrl: string = 'http://localhost:3500/api/task';
  token: any = readLocalStorage('token');

  constructor(private http: HttpClient) {}

  listTask(status?: string, user?: string): Observable<Task[]> {
    if (status == 'ALL') {
      this.baseUrl = 'http://localhost:3500/api/task';
    }

    if (status && status !== 'ALL') {
      this.baseUrl = `http://localhost:3500/api/task?status=${status}`;
    }

    if (user) {
      this.baseUrl = `http://localhost:3500/api/task?user=${status}`;
    }

    if (user && status) {
      this.baseUrl = `http://localhost:3500/api/task?status=${status}&user=${user}`;
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.token}`
    );

    return this.http.get<Task[]>(`${this.baseUrl}`, { headers });
  }

  createTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.token}`
    );

    return this.http
      .post<Task>(`${this.genericUrl}`, task, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  getTask(id: string | any): Observable<Task> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.token}`
    );
    return this.http.get<Task>(`${this.genericUrl}/${id}`, { headers });
  }

  deleteTask(id: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.token}`
    );
    return this.http.delete<Task>(`${this.genericUrl}/${id}`, { headers });
  }

  updateTask(task: Task, id: string | any): Observable<Task> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.token}`
    );
    return this.http
      .patch<Task>(`${this.genericUrl}/${id}`, task, { headers })
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }
}
