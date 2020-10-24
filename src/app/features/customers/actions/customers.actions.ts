import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/shared/interfaces';

export const setNewCustomer = createAction(
  '[Customers] Set new Customer',
  props<{id:number}>()
);

export const pushNewOrder = createAction(
  '[Customers] Push new Order',
  props<{order:Order}>()
);



