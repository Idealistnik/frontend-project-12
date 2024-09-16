/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState(
  { toRemove: null, toRename: null },
);

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannelToRemove: (state, action) => {
      state.toRemove = action.payload;
    },
    setChannelToRename: (state, action) => {
      state.toRename = action.payload;
    },
    renameChannel: channelsAdapter.updateOne,
    addChannel: channelsAdapter.addOne,
    setChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
  },
});

export const {
  addChannel,
  setChannels,
  removeChannel,
  setChannelToRemove,
  setChannelToRename,
  renameChannel,
} = channelSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const getChannelIdToRemove = (state) => state.channels.toRemove;
export const getChannelIdToRename = (state) => state.channels.toRename;
export default channelSlice;
