import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatDialogComponent } from './edit-cat-dialog.component';

describe('EditCatDialogComponent', () => {
  let component: EditCatDialogComponent;
  let fixture: ComponentFixture<EditCatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
