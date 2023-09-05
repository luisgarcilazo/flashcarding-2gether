import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/DTO/Lesson';
import { MatDialog } from '@angular/material/dialog';
import { LessonService } from 'src/app/services/lesson.service';
@Component({
  selector: 'app-my-lessons',
  templateUrl: './my-lessons.component.html',
  styleUrls: ['./my-lessons.component.css']
})
export class MyLessonsComponent {
  lessons!: Lesson[];

  constructor(private dialog: MatDialog,
              private router: Router,
              private lessonService: LessonService){};

  ngOnInit(): void {
    this.retrieveLessons();
  }

  retrieveLessons(): void {
    this.lessonService.getLessons().subscribe((lessons) => {
      //this.lessons = lessons;
      this.lessons = lessons.filter((lesson) => lesson.username == localStorage.getItem('currentUser'));
    })
  }

  accessCard(id: number){
    this.router.navigate(['/lessons/id/' + id]);
  }

  hasLessons(): boolean {
    if(this.lessons == null || this.lessons.length == 0){
      return false;
    } else {
      return true;
    }
  }
}
