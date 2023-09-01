import { Component } from '@angular/core';
import { Flashcard } from 'src/app/DTO/Flashcard';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Lesson } from 'src/app/DTO/Lesson';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent {
  title!: string;
  subject!: string;
  description!: string;
  creation_date !: string;
  isPublic: boolean = false;
  flashcards: Array<Flashcard> = [];

  constructor(private dialog: MatDialog,
              private router: Router,
              private lessonService: LessonService){}

  addFlashcard(){
    this.flashcards.push({term: "", description: ""});
    console.log(this.flashcards)
  }
  //code gotten from here https://stackoverflow.com/questions/15292278/how-do-i-remove-an-array-item-in-typescript
  removeFlashcard(flashcard: Flashcard){
    this.flashcards.forEach((item, index) => {
      if(item === flashcard) this.flashcards.splice(index, 1);
    })
  }

  getIndexFromFlashcard(flashcard: Flashcard){
    return this.flashcards.indexOf(flashcard) + 1;
  }

  saveLesson(){
   if(this.title == null || this.subject == null || this.description == null || this.title == "" || this.subject == "" || this.description == ""){
    const lessonFieldErrorDialog = this.dialog.open(LessonFieldErrorDialog);
    lessonFieldErrorDialog.afterClosed().subscribe();
    return;
   } 
   if(this.flashcards.length == 0){
    const noFlashcardsErrorDialog = this.dialog.open(NoFlashcardsErrorDialog);
    noFlashcardsErrorDialog.afterClosed().subscribe();
    return;
   }
   if(this.title.length > 50 || this.subject.length > 50 || this.description.length > 150){
    const fieldLengthErrorDialog = this.dialog.open(FieldLengthErrorDialog)
    fieldLengthErrorDialog.afterClosed();
    return;
   }

   for(let flashcard of this.flashcards){
    if(flashcard.term == null || flashcard.description == null
       || flashcard.term == "" || flashcard.description == ""){
        const flashcardFieldErrorDialog = this.dialog.open(FlashcardFieldErrorDialog);
        flashcardFieldErrorDialog.afterClosed().subscribe();
        return; 
       } else if(flashcard.term.length > 50 || flashcard.description.length > 50){
        const fieldLengthErrorDialog = this.dialog.open(FieldLengthErrorDialog);
        fieldLengthErrorDialog.afterClosed();
        return;
       }
   }


   const lessonConfirmDialog = this.dialog.open(LessonConfirmDialog);
   lessonConfirmDialog.afterClosed().subscribe((result) => {
    if(result){
      //help with date from here https://stackoverflow.com/questions/51299944/get-current-date-with-yyyy-mm-dd-format-in-angular-4
      let curDate = new Date();
      let rawLesson: Lesson = {
        title: this.title,
        subject: this.subject,
        creationDate: formatDate(curDate, 'yyyy-MM-dd', 'en-US'),
        public: this.isPublic,
        username: localStorage.getItem('currentUser') as string,
        description: this.description,
        flashcards: this.flashcards
       }
       this.lessonService.addLesson(rawLesson).subscribe({
        next: (result) => {
          const lessonSuccessDialog = this.dialog.open(LessonSuccessDialog);
          lessonSuccessDialog.afterClosed().subscribe(() => {
            this.router.navigate(['home']);
          });
        },
        error: (error) => {
          console.log("Error happened during http request");
          console.log(error);
          const httpErrorDialog = this.dialog.open(HttpErrorDialog);
          httpErrorDialog.afterClosed().subscribe();
          return;
        },
        complete: () => { }
      });
    }
   })
  }
}

@Component({
  selector: 'flashcard-field-error-dialog',
  templateUrl: 'flashcard-field-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class FlashcardFieldErrorDialog {}

@Component({
  selector: 'lesson-field-error-dialog',
  templateUrl: 'lesson-field-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class LessonFieldErrorDialog {}

@Component({
  selector: 'no-flashcard-error-dialog',
  templateUrl: 'no-flashcard-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class NoFlashcardsErrorDialog {}

@Component({
  selector: 'lesson-confirm-dialog',
  templateUrl: 'lesson-confirm-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class LessonConfirmDialog {}

@Component({
  selector: 'lesson-success-dialog',
  templateUrl: 'lesson-success-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class LessonSuccessDialog {}

@Component({
  selector: 'field-length-error-dialog',
  templateUrl: 'field-length-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class FieldLengthErrorDialog {}

@Component({
  selector: 'http-error-dialog',
  templateUrl: 'http-error-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class HttpErrorDialog {}

