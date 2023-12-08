import { TestBed } from '@angular/core/testing';

import { SplService } from './spl.service';

describe('SplService', () => {
  let service: SplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
