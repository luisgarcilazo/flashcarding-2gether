import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLessonsComponent } from './public-lessons.component';

describe('PublicLessonsComponent', () => {
  let component: PublicLessonsComponent;
  let fixture: ComponentFixture<PublicLessonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicLessonsComponent]
    });
    fixture = TestBed.createComponent(PublicLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
