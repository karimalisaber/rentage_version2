import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedOrdersComponent } from './blocked-orders.component';

describe('BlockedOrdersComponent', () => {
  let component: BlockedOrdersComponent;
  let fixture: ComponentFixture<BlockedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
