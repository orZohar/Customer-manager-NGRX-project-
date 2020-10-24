import { Action, createReducer, on } from '@ngrx/store';
import {setNewOrder} from '../actions/orders.actions';

export const ordersFeatureKey = 'orders';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(setNewOrder, (state, action) => ({...state, ['Order']:null}))
);