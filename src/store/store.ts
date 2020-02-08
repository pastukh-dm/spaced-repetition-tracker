import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
const localStoreState = localStorage.getItem('storeState');
const preloadedState = localStoreState ? JSON.parse(localStoreState) : undefined;
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('storeState', serializedState);
  } catch (e) {
    debugger
  }
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState
})

store.subscribe(() => {
  saveState(store.getState());
})