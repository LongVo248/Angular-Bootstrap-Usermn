import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3471/api/v1/users';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  updateUser(userName: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${userName}`, value);
  }

  deleteUser(userName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userName}`, { responseType: 'text' });
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
