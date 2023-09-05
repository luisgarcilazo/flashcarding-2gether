import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/DTO/User';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit{
  username!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  userCreated!: User;
  hide: boolean = true;
  hideConfirmPass: boolean = true;

  constructor(private router: Router,
              private dialog: MatDialog,
              private accountService: AccountService){}

  ngOnInit() {
    this.accountService.clean();
  }
  createAccount(): void{
    if(this.username == null || this.password == null || this.confirmPassword == null
       || this. username == "" || this.password == "" || this.confirmPassword == ""){
      const fieldErrorDialog = this.dialog.open(CreateFieldErrorDialog);
      fieldErrorDialog.afterClosed().subscribe();
      return;
    }
    //passwords do not match
    if(this.password != this.confirmPassword) {
      const passwordDialog = this.dialog.open(PasswordErrorDialog);
      passwordDialog.afterClosed().subscribe();
      return;
    }
    //email error
    if(!this.validateEmail(this.email)){
      const emailDialog = this.dialog.open(EmailErrorDialog);
      emailDialog.afterClosed().subscribe();
      return;
    }
    //username, password, or email too long
    if(this.username.length > 50 || this.password.length > 80 || this.email.length > 80){
      const lengthDialog = this.dialog.open(LengthErrorDialog)
      lengthDialog.afterClosed().subscribe();
      return;
    }
    this.hide = true;
    const newUser : User = {
      username : this.username,
      email : this.email,
      password : this.password
    }
    const dialogRef =  this.dialog.open(CreateAccDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.accountService.addBasicUser(newUser).subscribe({
          next: (user) => {
                this.userCreated = user;
                const dialogRef2 = this.dialog.open(CreateSuccessDialog);
                dialogRef2.afterClosed().subscribe((result) => {
                  this.goToLogin();
                })
              },
          error: (error) => {
                console.log("Error happened during http request");
                console.log(error);
                const httpErrorDialog = this.dialog.open(HttpErrorDialog);
                httpErrorDialog.afterClosed().subscribe();
                return;
          },
          complete: () => { }
        })
      }
    })
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  //help from here https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  validateEmail(email: string){
    return String(email).toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
  }
}

@Component({
  selector: 'create-acc-dialog',
  templateUrl: 'create-acc-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class CreateAccDialog {}

@Component({
  selector: 'create-success-dialog',
  templateUrl: 'create-success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class CreateSuccessDialog {}

@Component({
  selector: 'password-error-dialog',
  templateUrl: 'password-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class PasswordErrorDialog {}

@Component({
  selector: 'email-error-dialog',
  templateUrl: 'email-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class EmailErrorDialog {}

@Component({
  selector: 'length-error-dialog',
  templateUrl: 'length-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class LengthErrorDialog {}

@Component({
  selector: 'field-error-dialog',
  templateUrl: 'field-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class CreateFieldErrorDialog {}

@Component({
  selector: 'http-error-dialog',
  templateUrl: 'http-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class HttpErrorDialog {}