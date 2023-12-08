import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindTurbineMapComponent } from './wind-turbine-map.component';

describe('WindTurbineMapComponent', () => {
  let component: WindTurbineMapComponent;
  let fixture: ComponentFixture<WindTurbineMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WindTurbineMapComponent]
    });
    fixture = TestBed.createComponent(WindTurbineMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
