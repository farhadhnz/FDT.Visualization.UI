import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousSimulationComponent } from './continuous-simulation.component';

describe('ContinuousSimulationComponent', () => {
  let component: ContinuousSimulationComponent;
  let fixture: ComponentFixture<ContinuousSimulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContinuousSimulationComponent]
    });
    fixture = TestBed.createComponent(ContinuousSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
