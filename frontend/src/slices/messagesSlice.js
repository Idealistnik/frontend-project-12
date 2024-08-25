/* eslint-disable functional/no-expression-statement */
/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-try-statement */
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (currentToken) => {
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    return response.data;
  },
);

// По умолчанию: { ids: [], entities: {} }
const initialState = messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null });

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
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
