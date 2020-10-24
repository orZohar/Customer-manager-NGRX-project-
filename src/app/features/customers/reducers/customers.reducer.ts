import { Action, createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/shared/interfaces';
import {pushNewOrder, setNewCustomer} from '../actions/customers.actions';
import { select, Store } from '@ngrx/store';

export const customersFeatureKey = 'customers';

export interface State {
  orders:Order[]
}

export const initialState: State = {
  orders: []
};


export const reducer = createReducer(
  initialState,
  on(setNewCustomer, (state, action) => ({...state, ['entityCache']:action.id})),
  on(pushNewOrder, (state, action) => ({...state, ['entityCache.Customer']:action.order}))
);


// export default (state = initialState, action) => {
//   switch(action.type) {
//       case ADD_COIN:
//           return [...state, action.portfolio]; // same as state.concat(action.portfolio)
//       default:
//           return state;
//   }
// }