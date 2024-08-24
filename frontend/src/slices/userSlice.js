/* eslint-disable functional/no-expression-statement */
/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-try-statement */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfoToStorage: (state, action) => {
      localStorage.setItem(action.payload.username, action.payload.token);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUserInfo: (state) => {
      state.userInfo = {};
    },
    setLoggedIn: (state) => {
      state.loggedIn = true;
    },
    setLoggedOut: (state) => {
      state.loggedIn = false;
      localStorage.clear();
    },
  },
});

export const {
  setUserInfo,
  removeUserInfo,
  setLoggedIn,
  setLoggedOut,
  setUserInfoToStorage,
} = userSlice.actions;
export const selectorLoggedIn = (state) => state.user.loggedIn;
export default userSlice;
