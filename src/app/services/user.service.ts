import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:9595';

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

  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/${username}`);
  }

  updateUser(username: string, user: User): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${username}`, user);
  }

  deleteUser(username: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${username}`);
  }

  searchUser(userName: string, firstname: string, lastname: string, email: string): Observable<any> {
    return this.httpClient.get<any>(this.baseURL + '/search?username=' + userName + '&firstname=' + firstname + '&lastname=' + lastname + '&email=' + email)
  }

  getAllUserNotPagination(): Observable<any> {
    return this.httpClient.get<any>(this.baseURL)
  }

  getUser(){
    return this.httpClient.get(this.baseURL+"/getusers")
  }
}
