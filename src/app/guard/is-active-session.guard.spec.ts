import { TestBed, async, inject } from '@angular/core/testing';

import { IsActiveSessionGuard } from './is-active-session.guard';

describe('IsActiveSessionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsActiveSessionGuard]
    });
  });

  it('should ...', inject([IsActiveSessionGuard], (guard: IsActiveSessionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
