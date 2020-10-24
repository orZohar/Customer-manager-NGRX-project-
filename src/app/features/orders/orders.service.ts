import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, HttpUrlGenerator, Logger } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { Order } from '../../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class OrdersService extends EntityCollectionServiceBase<Order> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Order', serviceElementsFactory);
  }

}
