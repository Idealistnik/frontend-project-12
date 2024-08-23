/* eslint-disable functional/no-expression-statement */
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAuthorized: (state, action) => {
      state.authorized = action.payload;
    },
  },
});

export const { setUserInfo, setAuthorized } = userSlice.actions;
export default userSlice;
