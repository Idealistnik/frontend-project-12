/* eslint-disable functional/no-expression-statement */
/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-try-statement */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

// По умолчанию: { ids: [], entities: {} }
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    setMessages: messagesAdapter.addMany,
    removeMessages: messagesAdapter.removeAll,
    removeMessage: (state, action) => {
      messagesAdapter.removeOne(state, action.payload);
    },
  },
});

export const {
  addMessage,
  setMessages,
  removeMessages,
  removeMessage,
} = messagesSlice.actions;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice;
