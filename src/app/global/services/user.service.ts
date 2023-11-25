import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../interfaces/user.interfaces';
import { readLocalStorage } from '../helpers/utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:3500/api/user';
  token: any = readLocalStorage('token');

  constructor(private http: HttpClient) {}

  validToken(): Observable<boolean> {
    if (!this.token || this.token === undefined) {
      return of(false);
    }
    return of(true);
  }

  register(user: User): Observable<string> {
    return this.http
      .post<string>(`${this.baseUrl}/register`, user)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  login(user: User): Observable<string> {
    return this.http
      .post<string>(`${this.baseUrl}/login`, user)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.token}`
    );
    return this.http.get<User[]>(`${this.baseUrl}`, { headers });
  }
}
