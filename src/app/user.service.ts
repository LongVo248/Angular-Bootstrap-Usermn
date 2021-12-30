import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:3471/api/v1/users';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'appication/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  // getUsersList(): Observable<User[]> {
  //   return this.httpClient.get<User[]>(`${this.baseURL}`);
  // }

  getUserList(index: number): Observable<any>{
    console.log("url= ",this.baseURL+'/page?size=5&page='+index);
    return this.httpClient.get<any>(this.baseURL+'/page?size=5&page='+index,this.httpOptions);
  }
  createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, user);
  }

  getUserByUsername(userName: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/${userName}`);
  }

  updateUser(userName: string, user: User): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${userName}`, user);
  }

  deleteUser(userName: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${userName}`);
  }

  searchUser(userName: string, firstname: string, lastname: string, email: string): Observable<any> {
    return this.httpClient.get<any>(this.baseURL + '/search?username=' + userName + '&firstname=' + firstname + '&lastname=' + lastname + '&email=' + email)
  }

  getAllUserNotPagination(): Observable<any> {
    return this.httpClient.get<any>(this.baseURL)
  }
}
