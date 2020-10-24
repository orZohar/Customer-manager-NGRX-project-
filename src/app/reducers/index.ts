import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import { environment } from '../../environments/environment';

  //import {State as messageState, reducer as messageReducer, firstMessageFeatureKey} from './message.reducer'
//1. import the State from every reducer add to here and assign it with a nickname
//2. import the redcuer from the reducer
//3. import the key of the mini state 
  //export const todoFeatureKey = 'todo';
  
  // under messageFeatureKey we define our state
  export interface State {
   // [firstMessageFeatureKey]: messageState
  }
  // our reducers collection (the data of the state and the reducers - will determine the new state)
  // every time we define a new reducer we need to add it to this reducers collection 
  export const reducers: ActionReducerMap<State> = {
    //[firstMessageFeatureKey]: messageReducer
  };
  
  
  export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
  