import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificChatComponent } from './specific-chat.component';

describe('SpecificChatComponent', () => {
  let component: SpecificChatComponent;
  let fixture: ComponentFixture<SpecificChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
