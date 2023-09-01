import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../DTO/User';
import { Role } from '../DTO/Role';
import { UpdateRequest } from '../DTO/UpdateRequest';
import { UpdatePasswordResponse } from '../DTO/UpdatePasswordResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private usersApi = 'http://localhost:8060/users';
  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private authService: AuthService,
              private http:HttpClient) {
    this.clean();    
  }

  addBasicUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.usersApi}/basic`, user, this.httpOptions);
  }

  addDevUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.usersApi}/dev`, user, this.httpOptions);
  }

  login(user: User): Observable<User>{
    return this.http.post<User>(`${this.usersApi}/login`, user, this.httpOptions);
  }

  updatePassword(updateRequest: UpdateRequest): Observable<UpdatePasswordResponse> {
    return this.http.put<UpdatePasswordResponse>(`${this.usersApi}/update/password`, updateRequest, this.httpOptions);
  }
  //reset authentication service and localstorage
  clean(): void {
    this.authService.deauthenticateAll();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authKey');
  }
}
