import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/DTO/Lesson';
import { AuthService } from 'src/app/services/auth.service';
import { LessonService } from 'src/app/services/lesson.service';
@Injectable({
  providedIn: 'root'
})
export class LessonGuard {
  constructor(private authService: AuthService, private lessonService: LessonService, private router: Router){};
  //got help from https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
  //and https://stackoverflow.com/questions/56865191/angular-auth-guard-with-subscribe to see how to implement it with observable from request
  canActivate(route: ActivatedRouteSnapshot, status: RouterStateSnapshot): Observable<boolean> {
    //string to int here https://stackoverflow.com/questions/14667713/how-to-convert-a-string-to-number-in-typescript
    // param help from https://stackoverflo.com/questions/49800298/custom-guard-get-id-route-params
    return new Observable<boolean>(obs => {
        let id: number = parseInt(route.paramMap.get('id') as string);
        let lesson: Lesson;
        let username: string = localStorage.getItem('currentUser') as string;
        this.lessonService.getLessonById(id).subscribe({
            next: (response) => {
                lesson = response;
                if(lesson.public == true){
                    obs.next(true);
                } else if (lesson.username == username){
                    obs.next(true);
                } else {
                    this.router.navigate(['/login']);
                    obs.next(false);
                }
            },
            error: (error) => {
                console.log("Error happened during http request");
                console.log(error);
                obs.next(false);
            },
            complete: () =>  {}
        });
    })
  }
  
}