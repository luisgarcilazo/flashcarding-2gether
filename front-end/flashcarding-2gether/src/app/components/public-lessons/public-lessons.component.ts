import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/DTO/Lesson';
import { LessonService } from 'src/app/services/lesson.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-public-lessons',
  templateUrl: './public-lessons.component.html',
  styleUrls: ['./public-lessons.component.css']
})
export class PublicLessonsComponent {

  lessons!: Lesson[];

  constructor(private dialog: MatDialog,
              private router: Router,
              private lessonService: LessonService){};

  ngOnInit(): void {
    this.retrieveLessons();
  }

  retrieveLessons(): void {
    this.lessonService.getLessons().subscribe((lessons) => {
      this.lessons = lessons;
      this.lessons = lessons.filter((lesson) => lesson.public == true);
    })
  }

  accessCard(id: number){
    this.router.navigate(['/lessons/id/' + id]);
  }
}
