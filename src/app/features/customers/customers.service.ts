import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, HttpUrlGenerator, Logger } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { Customer } from '../../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class CustomersService extends EntityCollectionServiceBase<Customer> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Customer', serviceElementsFactory);
  }

  

}
