
import { createAction, props } from '@ngrx/store';

export const setNewOrder = createAction(
  '[Orders] Set new Order',
  props<{id:number}>()
);
