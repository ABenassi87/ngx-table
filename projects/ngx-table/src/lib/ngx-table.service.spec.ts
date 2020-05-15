import { TestBed } from '@angular/core/testing';

import { NgxTableService } from './ngx-table.service';

describe('NgxTableService', () => {
  let service: NgxTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
