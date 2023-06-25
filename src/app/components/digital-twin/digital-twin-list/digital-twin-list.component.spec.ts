import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalTwinListComponent } from './digital-twin-list.component';

describe('DigitalTwinListComponent', () => {
  let component: DigitalTwinListComponent;
  let fixture: ComponentFixture<DigitalTwinListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalTwinListComponent]
    });
    fixture = TestBed.createComponent(DigitalTwinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
