/* eslint-disable functional/no-expression-statement */
/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-try-statement */
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { removeChannel } from './channelSlice';

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
// const socket = io('http://localhost:3000');

// По умолчанию: { ids: [], entities: {} }
const initialState = messagesAdapter.getInitialState({ socket: null, loadingStatus: 'idle', error: null });

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addSocket: (state, action) => {
      state.socket = action.payload;
    },
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
      })
      .addCase(removeChannel, (state, action) => {
        const idToRemove = action.payload;
        console.log(typeof idToRemove);
        const restEntities = Object.values(state.entities)
          .filter(({ channelId }) => channelId !== +idToRemove);
        console.log(restEntities.values);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const {
  addMessage,
  setMessages,
  removeMessages,
  removeMessage,
  addSocket,
} = messagesSlice.actions;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice;
