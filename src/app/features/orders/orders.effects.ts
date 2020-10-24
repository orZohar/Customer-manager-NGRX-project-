import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EntityCollectionServiceFactory, EntityCollectionService } from '@ngrx/data';
import {   Order} from '../../shared/interfaces';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
//EntityCollectionServiceFactory the service we created at the background in the customers.module, now we can bring it

@Injectable()
export class OrdersEffects implements OnInitEffects{
  private ordersService : EntityCollectionService<Order>;

  @Effect({ // orginally getAll also produce an action but we don't need it because our customers will be brought and saved in the state
    dispatch: false}
  )
  initOrders$ : Observable<Order[]> = this.actions$.pipe(
    ofType('INIT_ORDERS'),
    mergeMap(()=> { 
      // also bring all the customers and also saves the users in the state
      return this.ordersService.getAll();
    })
  )

  constructor(private actions$: Actions, private serviceFactory: EntityCollectionServiceFactory) {
    // gives us the service that was created with ngrx/data
    this.ordersService = this.serviceFactory.create('Order');
  }

  // will run when the effect is started/generated
  ngrxOnInitEffects(): Action {
    // we will send an action called INIT CUSTOMERS
    return{
      type:'INIT_ORDERS'
    }
  }

}