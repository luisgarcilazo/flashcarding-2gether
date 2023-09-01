import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  //help at implementing it from https://www.scaler.com/topics/angular/angular-interceptor/
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authService.isAuthenticated()){
      return next.handle(request.clone({setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authKey') as string
      }}));
    } else {
      return next.handle(request.clone({setHeaders: {
        'Content-Type': 'application/json'
      }}));
    }
  }
}
