import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificClientChatComponent } from './specific-client-chat.component';

describe('SpecificClientChatComponent', () => {
  let component: SpecificClientChatComponent;
  let fixture: ComponentFixture<SpecificClientChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificClientChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificClientChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
