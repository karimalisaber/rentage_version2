import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOwnersOrdersComponent } from './all-owners-orders.component';

describe('AllOwnersOrdersComponent', () => {
  let component: AllOwnersOrdersComponent;
  let fixture: ComponentFixture<AllOwnersOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOwnersOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOwnersOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
