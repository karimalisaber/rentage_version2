import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastedUsersComponent } from './lasted-users.component';

describe('LastedUsersComponent', () => {
  let component: LastedUsersComponent;
  let fixture: ComponentFixture<LastedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
