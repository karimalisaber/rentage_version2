import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWrapperComponent } from './order-wrapper.component';

describe('OrderWrapperComponent', () => {
  let component: OrderWrapperComponent;
  let fixture: ComponentFixture<OrderWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
