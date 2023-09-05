import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { MyLessonsComponent } from './components/my-lessons/my-lessons.component';
import { PublicLessonsComponent } from './components/public-lessons/public-lessons.component';
import { CreateLessonComponent } from './components/create-lesson/create-lesson.component';
import { AboutComponent } from './components/about/about.component';
import { DevGuard } from './components/guards/dev-guard';
import { BasicGuard } from './components/guards/basic-guard';
import { UnauthenticatedGuard } from './components/guards/unauthenticated-guard';
import { LessonComponent } from './components/lesson/lesson.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';
import { LessonGuard } from './components/guards/lesson-guard';
const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch:  'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'create-account', component: CreateAccountComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'lessons', component: PublicLessonsComponent
  },
  {
    path: 'lessons/id/:id', component: LessonComponent,
    canActivate: [LessonGuard]
  },
  {
    path: 'lessons/saved', component: MyLessonsComponent,
    canActivate: [BasicGuard]
  },
  {
    path: 'lessons/create', component: CreateLessonComponent,
    canActivate: [BasicGuard]
  },
  {
    path: 'update-account', component: UpdateAccountComponent,
    canActivate: [BasicGuard]
  },
  {
    path: 'about', component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
