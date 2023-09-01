import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PublicLessonsComponent } from './components/public-lessons/public-lessons.component';
import { MyLessonsComponent } from './components/my-lessons/my-lessons.component';
import { CreateLessonComponent } from './components/create-lesson/create-lesson.component';
import { AboutComponent } from './components/about/about.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    CreateAccountComponent,
    PublicLessonsComponent,
    MyLessonsComponent,
    CreateLessonComponent,
    AboutComponent,
    LessonComponent,
    UpdateAccountComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule,
    MatCheckboxModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
