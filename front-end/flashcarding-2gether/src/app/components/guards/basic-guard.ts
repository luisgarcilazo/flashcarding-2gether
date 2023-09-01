import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class BasicGuard {
  constructor(private authService: AuthService, private router: Router){};
  //got help from https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
  canActivate(route: ActivatedRouteSnapshot, status: RouterStateSnapshot): boolean {
    if(!this.authService.isAuthenticatedBasic()){
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
  
}