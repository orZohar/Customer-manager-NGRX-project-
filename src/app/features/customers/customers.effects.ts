import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EntityCollectionServiceFactory, EntityCollectionService } from '@ngrx/data';
import {Customer} from '../../shared/interfaces';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
//EntityCollectionServiceFactory the service we created at the background in the customers.module, now we can bring it

@Injectable()
export class CustomersEffects implements OnInitEffects{
  private customersService : EntityCollectionService<Customer>;

  @Effect({ // orginally getAll also produce an action but we don't need it because our customers will be brought and saved in the state
    dispatch: false}
  )
  initCustomers$ : Observable<Customer[]> = this.actions$.pipe(
    ofType('INIT_CUSTOMERS'),
    mergeMap(()=> { 
      // also bring all the customers and also saves the users in the state
      return this.customersService.getAll();
    })
  )

  constructor(private actions$: Actions, private serviceFactory: EntityCollectionServiceFactory) {
    // gives us the service that was created with ngrx/data
    this.customersService = this.serviceFactory.create('Customer');
  }

  // will run when the effect is started/generated
  ngrxOnInitEffects(): Action {
    // we will send an action called INIT CUSTOMERS
    return{
      type:'INIT_CUSTOMERS'
    }
  }

}
 // deleteError$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofEntityType("CUSTOMER"),
  //     ofEntityOp([EntityOp.SAVE_DELETE_ONE_ERROR]),
  //     tap(a => console.log("Effect", a)),
  //     map(action => {
  //       const id = action.payload.data.originalAction.payload.data;

  //       return new EntityActionFactory().create(
  //         "Customer",
  //         EntityOp.UNDO_ONE,
  //         action.payload.data.originalAction.payload.data,
  //         {
  //           correlationId:
  //             action.payload.data.originalAction.payload.correlationId,
  //           mergeStrategy: MergeStrategy.PreserveChanges,
  //           isOptimistic: true
  //         }
  //       );
  //     })
  //   );
  // });
