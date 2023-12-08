import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDigitalTwinComponent } from './create-digital-twin.component';

describe('CreateDigitalTwinComponent', () => {
  let component: CreateDigitalTwinComponent;
  let fixture: ComponentFixture<CreateDigitalTwinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDigitalTwinComponent]
    });
    fixture = TestBed.createComponent(CreateDigitalTwinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
