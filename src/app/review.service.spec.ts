import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';
import {HttpClientModule} from '@angular/common/http';

describe('ReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: ReviewService = TestBed.get(ReviewService);
    expect(service).toBeTruthy();
  });
});
