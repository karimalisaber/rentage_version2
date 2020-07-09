import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientsOrdersComponent } from './all-clients-orders.component';

describe('AllClientsOrdersComponent', () => {
  let component: AllClientsOrdersComponent;
  let fixture: ComponentFixture<AllClientsOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllClientsOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClientsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
