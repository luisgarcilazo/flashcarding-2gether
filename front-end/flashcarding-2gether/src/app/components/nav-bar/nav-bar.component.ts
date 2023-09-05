import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  username!: string;

  constructor(private router: Router,
              private dialog: MatDialog,
              private authService: AuthService,
              private accountService: AccountService){}

  isLoggedIn(){
    this.username = localStorage.getItem('currentUser') as string;
    return this.authService.isAuthenticated();
  }

  logout(){
    const confirmDialog = this.dialog.open(ConfirmLogoutDialog);
    confirmDialog.afterClosed().subscribe(result => {
      if(result){
        this.accountService.clean();
        const successDialog = this.dialog.open(LogoutSuccessDialog);
        this.router.navigate(['/home']);
      }
    })
  }
}

@Component({
  selector: 'logout-success-dialog',
  templateUrl: 'logout-success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class LogoutSuccessDialog {}

@Component({
  selector: 'confirm-logout-dialog',
  templateUrl: 'confirm-logout-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmLogoutDialog {}
