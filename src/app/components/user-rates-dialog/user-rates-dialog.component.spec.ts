import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRatesDialogComponent } from './user-rates-dialog.component';

describe('UserRatesDialogComponent', () => {
  let component: UserRatesDialogComponent;
  let fixture: ComponentFixture<UserRatesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRatesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
