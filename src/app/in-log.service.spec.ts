import { TestBed } from '@angular/core/testing';

import { InLogService } from './in-log.service';
import {HttpClientModule} from '@angular/common/http';

describe('InLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: InLogService = TestBed.get(InLogService);
    expect(service).toBeTruthy();
  });
});
