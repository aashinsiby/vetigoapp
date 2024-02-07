import { TestBed } from '@angular/core/testing';

import { VisibleService } from './visible.service';

describe('VisibleService', () => {
  let service: VisibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
