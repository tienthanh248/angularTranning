import { TestBed } from '@angular/core/testing';

import { CheckEditGuard } from './check-edit.guard';

describe('CheckEditGuard', () => {
  let guard: CheckEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
