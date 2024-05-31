import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueBooksComponent } from './issue-books.component';

describe('IssueBooksComponent', () => {
  let component: IssueBooksComponent;
  let fixture: ComponentFixture<IssueBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssueBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
