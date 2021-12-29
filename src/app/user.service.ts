import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:3471/api/v1/users';

  constructor(private httpClient: HttpClient) { }
  
  getUsersList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }

  createUser(user: User): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, user);
  }

  getUserByUsername(userName: string): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${userName}`);
  }

  updateUser(userName: string, user: User): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${userName}`, user);
  }

  deleteUser(userName: string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${userName}`);
  }
}
