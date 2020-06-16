import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificMessageComponent } from './specific-message.component';

describe('SpecificMessageComponent', () => {
  let component: SpecificMessageComponent;
  let fixture: ComponentFixture<SpecificMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
