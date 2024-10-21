import { TestBed } from '@angular/core/testing';

import { ItemStyleService } from './item-style.service';

describe('ItemStyleService', () => {
  let service: ItemStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
