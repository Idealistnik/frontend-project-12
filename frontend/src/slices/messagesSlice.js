/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { removeChannel } from './channelSlice';
import routes from '../routes/routes';

const messagesAdapter = createEntityAdapter();

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (currentToken) => {
    const response = await axios.get(routes.messages(), {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    return response.data;
  },
);

const initialState = messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null });

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    setMessages: messagesAdapter.addMany,
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
        const restEntities = Object.values(state.entities)
          .filter(({ channelId }) => channelId !== +idToRemove);
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const {
  addMessage,
  setMessages,
  removeMessage,
} = messagesSlice.actions;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice;
