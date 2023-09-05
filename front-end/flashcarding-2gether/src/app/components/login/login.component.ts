import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/DTO/User';
import { Role } from 'src/app/DTO/Role';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  loginUser!: User;
  hide: boolean = true;

  constructor(private router: Router,
    private dialog: MatDialog,
    private accountService: AccountService,
    private authService: AuthService){}

  ngOnInit() {
    this.accountService.clean();
  }
  
  login(){
    if(this.username == null || this.password == null || this.username == "" || this.password == ""){
      const fieldDialog = this.dialog.open(FieldErrorDialog);
      fieldDialog.afterClosed().subscribe();
      return;
    }
    this.accountService.clean();
    let userdetails = {
      username: this.username,
      password: this.password
    }
    this.accountService.login(userdetails).subscribe({
      next: (user) => {
            this.loginUser = user;
            let isBasic: boolean = false;
            let isDev: boolean = false;
            if(user.username == null && user.password == null){
              //userdetails wrong, did not get user back from back-end
              const loginErrorDialog = this.dialog.open(LoginErrorDialog)
              loginErrorDialog.afterClosed().subscribe(() =>{
                this.username = "";
                this.password = "";
              });
              return;
            }
            //user details correct, update bookkeeping
            localStorage.setItem('currentUser', userdetails.username);
            localStorage.setItem('authKey', 'Basic ' + btoa(`${userdetails.username}:${userdetails.password}`));
            this.loginUser.roles?.forEach((role: Role) => {
                if(role.name === 'ROLE_BASIC'){
                  isBasic = true;
                }
                if(role.name === 'ROLE_DEVELOPER'){
                  isDev = true;
                }
            })
            if(isDev){
              this.authService.authenticateBasic();
              this.authService.authenticateDev();
            } else if (isBasic){
              this.authService.authenticateBasic();
            } else { //handle no roles

            }
            const loginSuccess = this.dialog.open(LoginSuccessDialog);
            this.router.navigate(['/lessons/saved']);
            this.username = "";
            this.password =  "";
          },
      error: (error) => {
            console.log("Error happened during http request");
            console.log(error);
            const httpErrorDialog = this.dialog.open(HttpErrorDialog);
            httpErrorDialog.afterClosed().subscribe();
            return;
      },
      complete: () => { }
    });
  }
  goToCreateAccount(): void {
    this.router.navigate(['/create-account']);
    
  }

}

@Component({
  selector: 'login-error-dialog',
  templateUrl: 'login-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class LoginErrorDialog {}

@Component({
  selector: 'login-success-dialog',
  templateUrl: 'login-success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class LoginSuccessDialog {}

@Component({
  selector: 'field-error-dialog',
  templateUrl: 'field-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class FieldErrorDialog {}

@Component({
  selector: 'http-error-dialog',
  templateUrl: 'http-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class HttpErrorDialog {}
