import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CustomersEffects } from './customers.effects';

describe('CustomersEffects', () => {
  let actions$: Observable<any>;
  let effects: CustomersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomersEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CustomersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
