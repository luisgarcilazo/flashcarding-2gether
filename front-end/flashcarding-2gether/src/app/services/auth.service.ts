import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedBasic: boolean = false;
  private authenticatedDev: boolean = false;

  constructor() { }

  isAuthenticated(): boolean {
    return this.authenticatedBasic || this.authenticatedDev;
  }
  isAuthenticatedBasic(): boolean {
    return this.authenticatedBasic;
  }
  isAuthenticatedDev(): boolean {
    return this.authenticatedDev;
  }


  authenticateBasic(): void {
    this.authenticatedBasic = true;
  }
  authenticateDev(): void {
    this.authenticatedDev = true;
  }


  deauthenticateBasic(): void {
    this.authenticatedBasic = false;
  }
  deauthenticateDev(): void {
    this.authenticatedDev = false;
  }

  deauthenticateAll(): void {
    this.authenticatedBasic = false;
    this.authenticatedDev = false;
  }
}
