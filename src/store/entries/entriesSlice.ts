import { entriesState, Entry } from './entriesState';
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
const uuidv1 = require('uuid/v1');

export const entriesSlice = createSlice({
  name: 'entries',
  initialState: entriesState,
  reducers: {
    createEntry(state, action: { payload: string }) {
      state.list.push({ id: uuidv1(), title: action.payload, learnedAt: moment().format('DD.MM.YYYY'), repeatedAt: [] });
    },
    deleteEntry(state, action: { payload: string }) {
      state.list = state.list.filter(entry => entry.id !== action.payload)
    },
    updateEntry(state, action: { payload: Entry }) {
      const itemIndex = state.list.findIndex(item => item.id === action.payload.id);
      state.list[itemIndex] = action.payload;
    }
  }
});
export const { createEntry, deleteEntry, updateEntry } = entriesSlice.actions;