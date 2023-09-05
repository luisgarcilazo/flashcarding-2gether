import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lesson } from '../DTO/Lesson';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessonApi = 'http://localhost:8060/lessons';
  private httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  constructor(private http:HttpClient) { }

  addLesson(lesson: Lesson): Observable<Lesson> {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authKey') as string
    })
    return this.http.post<Lesson>(this.lessonApi,lesson,this.httpOptions);
  }

  getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.lessonApi, this.httpOptions);
  }
  getUserLessons(username: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.lessonApi}/user/${username}`, this.httpOptions);
  }

  getLessonById(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.lessonApi}/${id}`, this.httpOptions);
  }
}
