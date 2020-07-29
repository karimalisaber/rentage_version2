import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOwnerComponent } from './orders-owner.component';

describe('OrdersOwnerComponent', () => {
  let component: OrdersOwnerComponent;
  let fixture: ComponentFixture<OrdersOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
