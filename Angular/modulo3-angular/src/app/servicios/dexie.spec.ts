import { TestBed } from '@angular/core/testing';

import { Dexie } from './dexie';

describe('Dexie', () => {
  let service: Dexie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dexie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
