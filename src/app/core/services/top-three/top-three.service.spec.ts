import { TestBed } from '@angular/core/testing';

import { TopThreeService } from './top-three.service';

describe('TopThreeService', () => {
  let service: TopThreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopThreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
