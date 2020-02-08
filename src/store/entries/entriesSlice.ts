import { entriesState } from './entriesState';
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
const uuidv1 = require('uuid/v1');

export const entriesSlice = createSlice({
  name: 'entries',
  initialState: entriesState,
  reducers: {
    addEntry(state, action: { payload: string }) {
      state.list.push({ id: uuidv1(), title: action.payload, learnedAt: moment().format('DD.MM.YYYY'), repeatedAt: [] });
    },
  }
});
export const { addEntry } = entriesSlice.actions;