import { TestBed } from '@angular/core/testing';

import { MenuServicceService } from './menu-servicce.service';

describe('MenuServicceService', () => {
  let service: MenuServicceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuServicceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
