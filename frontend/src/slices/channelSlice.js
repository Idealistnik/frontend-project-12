/* eslint-disable functional/no-expression-statement */
/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-try-statement */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
// По умолчанию: { ids: [], entities: {} }
const initialState = channelsAdapter.getInitialState();

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
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
} = channelSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelSlice;
