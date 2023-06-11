import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindTurbineComponent } from './wind-turbine.component';

describe('WindTurbineComponent', () => {
  let component: WindTurbineComponent;
  let fixture: ComponentFixture<WindTurbineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WindTurbineComponent]
    });
    fixture = TestBed.createComponent(WindTurbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
