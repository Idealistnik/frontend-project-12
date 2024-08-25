/* eslint-disable functional/no-expression-statement */
/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-try-statement */

import { createSlice } from '@reduxjs/toolkit';

const defaultGeneralChannelId = 1;
const initialState = {
  pressedChannelId: defaultGeneralChannelId,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPressedChannel: (state, action) => {
      state.pressedChannelId = action.payload;
    },
  },
});

export const {
  setPressedChannel,
} = uiSlice.actions;
export const getPressedChannelId = (state) => state.ui.pressedChannelId;
export default uiSlice;
