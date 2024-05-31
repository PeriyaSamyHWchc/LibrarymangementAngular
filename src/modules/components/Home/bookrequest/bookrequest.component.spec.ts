import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookrequestComponent } from './bookrequest.component';

describe('BookrequestComponent', () => {
  let component: BookrequestComponent;
  let fixture: ComponentFixture<BookrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookrequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
