import { entriesSlice } from './entries/entriesSlice';
import { ReducersMapObject } from 'redux';

export const rootReducer: ReducersMapObject = {
  entries: entriesSlice.reducer
};
