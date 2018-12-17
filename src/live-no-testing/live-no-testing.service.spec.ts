import { TestBed } from '@angular/core/testing';

import { LiveNoTestingService } from './live-no-testing.service';

describe('LiveNoTestingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveNoTestingService = TestBed.get(LiveNoTestingService);
    expect(service).toBeTruthy();
  });
});
