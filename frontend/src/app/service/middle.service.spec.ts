import { TestBed } from '@angular/core/testing';

import { MiddleService } from './middle.service';

describe('MiddleService', () => {
  let service: MiddleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiddleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
