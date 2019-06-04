import { TestBed } from '@angular/core/testing';

import { FilmapiService } from './filmapi.service';

describe('FilmapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilmapiService = TestBed.get(FilmapiService);
    expect(service).toBeTruthy();
  });
});
