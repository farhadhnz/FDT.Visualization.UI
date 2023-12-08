import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalTwinDashboardComponent } from './digital-twin-dashboard.component';

describe('DigitalTwinDashboardComponent', () => {
  let component: DigitalTwinDashboardComponent;
  let fixture: ComponentFixture<DigitalTwinDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalTwinDashboardComponent]
    });
    fixture = TestBed.createComponent(DigitalTwinDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
