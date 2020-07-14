import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsRatesDialogComponent } from './posts-rates-dialog.component';

describe('PostsRatesDialogComponent', () => {
  let component: PostsRatesDialogComponent;
  let fixture: ComponentFixture<PostsRatesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsRatesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsRatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
