/* eslint-disable functional/no-expression-statement */
/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-try-statement */

import { createSlice } from '@reduxjs/toolkit';

const defaultGeneralChannelId = 1;
const initialState = {
  pressedChannelId: defaultGeneralChannelId,
  pressedChannelAdd: false,
  pressedChannelRemove: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPressedChannel: (state, action) => {
      state.pressedChannelId = action.payload;
    },
    setPressedAddChannel: (state, action) => {
      state.pressedChannelAdd = action.payload;
    },
    setPressedRemoveChannel: (state, action) => {
      state.pressedChannelRemove = action.payload;
    },
  },
});

export const {
  setPressedChannel,
  setPressedAddChannel,
  setPressedRemoveChannel,
} = uiSlice.actions;
export const getPressedChannelId = (state) => state.ui.pressedChannelId;
export const getPressedAddChannel = (state) => state.ui.pressedChannelAdd;
export const getPressedRemoveChannel = (state) => state.ui.pressedChannelRemove;
export default uiSlice;
