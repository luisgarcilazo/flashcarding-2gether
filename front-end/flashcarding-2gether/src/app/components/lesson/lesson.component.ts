import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lesson } from 'src/app/DTO/Lesson';
import { LessonService } from 'src/app/services/lesson.service';
import { Flashcard } from 'src/app/DTO/Flashcard';
@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  private routeSub!: Subscription;
  id!: number;
  lesson!: Lesson;
  flashcardIndex: number = 0;
  displayTerm: boolean = true;
  sampletext: string = "hello";
  constructor(private route: ActivatedRoute,
              private router: Router,
              private lessonService: LessonService){}

  //help with retrieving id from url from https://stackoverflow.com/questions/42839074/extract-id-from-url-using-angular-2-till-latest
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.retrieveLessons(this.id);
    })
  }

  retrieveLessons(id: number){
    this.lessonService.getLessonById(id).subscribe((lesson) => {
      this.lesson = lesson;
      //lesson does not exist, instantly route away from here
      if(this.lesson.id == null && this.lesson.title == null
         && this.lesson.subject == null && this.lesson.creationDate == null
         && this.lesson.username == null && this.lesson.description == null
         && this.lesson.flashcards == null && this.lesson.public == false){
          this.router.navigate(['/home']);
          return;
         }   
    })
  }
  
  flipFlashcard(): void {
    console.log(this.lesson);
    this.displayTerm = !this.displayTerm;
  }

  goForward(): void{
    if(this.flashcardIndex < this.lesson.flashcards.length - 1){
      this.flashcardIndex++;
    } else {
      return;
    }
  }

  goBackward():void {
    if(this.flashcardIndex > 0){
      this.flashcardIndex--;
    } else {
      return;
    }
  }

  getIndexFromFlashcard(flashcard: Flashcard){
    return this.lesson.flashcards.indexOf(flashcard) + 1;
  }

}

