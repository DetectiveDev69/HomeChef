import { TestBed } from '@angular/core/testing';

import { IncomingordersService } from './incomingorders.service';

describe('IncomingordersService', () => {
  let service: IncomingordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomingordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
