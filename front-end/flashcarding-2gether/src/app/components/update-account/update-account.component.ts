import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { UpdateRequest } from 'src/app/DTO/UpdateRequest';
import { AccountService } from 'src/app/services/account.service';
import { UpdatePasswordResponse } from 'src/app/DTO/UpdatePasswordResponse';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent {
  email!: string;
  oldPassword!: string;
  confirmOldPassword!: string;
  newPassword!: string;
  confirmNewPassword!: string;
  oldPassHide: boolean = true;
  newPassHide: boolean = true;
  oldConfirmPassHide: boolean = true;
  newConfirmPassHide: boolean = true;

  constructor(private dialog: MatDialog,
              private router: Router,
              private accountService: AccountService){}

  updateAccount(): void {
    if(this.email == null || this.oldPassword == null || this.confirmOldPassword == null || this.newPassword == null || this.confirmNewPassword == null
      || this. email == "" || this.oldPassword == "" || this.confirmOldPassword == "" || this.newPassword == null || this.confirmNewPassword == null){
     const fieldErrorDialog = this.dialog.open(UpdateFieldErrorDialog);
     fieldErrorDialog.afterClosed().subscribe();
     return;
   }
   //old passwords do not match
   if(this.oldPassword != this.confirmOldPassword) {
     const oldPasswordDialog = this.dialog.open(OldPasswordErrorDialog);
     oldPasswordDialog.afterClosed().subscribe();
     return;
   }
   //old passwords do not match
   if(this.newPassword != this.confirmNewPassword) {
    const newPasswordDialog = this.dialog.open(NewPasswordErrorDialog);
    newPasswordDialog.afterClosed().subscribe();
    return;
   }   
   //email error
   if(!this.validateEmail(this.email)){
     const emailDialog = this.dialog.open(EmailErrorDialog);
     emailDialog.afterClosed().subscribe();
     return;
   }
   //username, password, or email too long
   if(this.newPassword.length > 80){
     const lengthDialog = this.dialog.open(LengthErrorDialog)
     lengthDialog.afterClosed().subscribe();
     return;
   }

   let updateRequest: UpdateRequest = {
    username: localStorage.getItem('currentUser') as string,
    password: this.oldPassword,
    newPassword: this.newPassword,
    email: this.email
   };
   const dialogRef = this.dialog.open(UpdateConfirmDialog)
   dialogRef.afterClosed().subscribe((result) => {
    if(result){
      this.accountService.updatePassword(updateRequest).subscribe({
          next: (updateResponse: UpdatePasswordResponse) => {
              console.log(updateResponse);
              this.clearFields();
              if(updateResponse.succesful == true){
                const successDialog = this.dialog.open(UpdatePasswordSuccessDialog);
                successDialog.afterClosed().subscribe(() => this.router.navigate(['/login']));
              } else {
                alert("Update failed for some unknown reason.");
              }
          },
          error: (error) => {
            this.clearFields();
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

  clearFields(): void{
    this.email = "";
    this.oldPassword = "";
    this.newPassword = "";
    this.confirmNewPassword = "";
    this.confirmOldPassword = "";
    return;
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
  selector: 'update-confirm-dialog',
  templateUrl: 'update-confirm-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class UpdateConfirmDialog {}

@Component({
  selector: 'field-error-dialog',
  templateUrl: 'field-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class UpdateFieldErrorDialog {}

@Component({
  selector: 'old-password-error-dialog',
  templateUrl: 'old-password-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class OldPasswordErrorDialog {}

@Component({
  selector: 'new-password-error-dialog',
  templateUrl: 'new-password-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class NewPasswordErrorDialog {}

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
  selector: 'http-error-dialog',
  templateUrl: 'http-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class HttpErrorDialog {}

@Component({
  selector: 'update-pass-success-dialog',
  templateUrl: 'update-pass-success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class UpdatePasswordSuccessDialog {}
