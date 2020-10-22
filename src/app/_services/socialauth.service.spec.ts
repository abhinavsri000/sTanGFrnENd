import { TestBed } from '@angular/core/testing';

import { SocialauthService } from './socialauth.service';

describe('SocialauthService', () => {
  let service: SocialauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
