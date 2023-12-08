import { TestBed } from '@angular/core/testing';

import { DigitalTwinService } from './digital-twin.service';

describe('DigitalTwinService', () => {
  let service: DigitalTwinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigitalTwinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
