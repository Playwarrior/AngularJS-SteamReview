import { TestBed } from '@angular/core/testing';

import { InLogService } from './in-log.service';

describe('InLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InLogService = TestBed.get(InLogService);
    expect(service).toBeTruthy();
  });
});
