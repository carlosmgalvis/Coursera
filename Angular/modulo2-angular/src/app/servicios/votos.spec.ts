import { TestBed } from '@angular/core/testing';

import { Votos } from './votos';

describe('Votos', () => {
  let service: Votos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Votos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
