/* eslint-disable functional/no-expression-statement */
/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-try-statement */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
// По умолчанию: { ids: [], entities: {} }
const initialState = channelsAdapter.getInitialState({ toRemove: null });

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannelToRemove: (state, action) => {
      state.toRemove = action.payload;
    },
    addChannel: channelsAdapter.addOne,
    setChannels: channelsAdapter.addMany,
    removeChannels: channelsAdapter.removeAll,
    removeChannel: (state, action) => {
      channelsAdapter.removeOne(state, action.payload);
    },
  },
});

export const {
  addChannel,
  setChannels,
  removeChannel,
  removeChannels,
  setChannelToRemove,
} = channelSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const getChannelIdToRemove = (state) => state.channels.toRemove;
export default channelSlice;
