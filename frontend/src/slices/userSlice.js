/* eslint-disable functional/no-expression-statement */
/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-try-statement */

import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async (values) => {
    const response = await axios.post(routes.login(), values);
    return response.data;
  },
);

export const fetchSignIn = createAsyncThunk(
  'user/fetchSignIn',
  async (values) => {
    const response = await axios.post(routes.signup(), values);
    console.log(response.data);
    return response.data;
  },
);

const getDefaultInfo = () => {
  const keys = Object.keys(localStorage);
  const username = keys[0];
  const token = localStorage.getItem(username);
  return { token, username };
};

const defaultInfo = localStorage.length > 0 ? getDefaultInfo() : null;

const initialState = {
  userInfo: defaultInfo || {},
  loggedIn: !!defaultInfo,
  loadingStatus: 'idle',
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loggedIn = true;
        state.loadingStatus = 'idle';
        state.error = null;
        localStorage.setItem(action.payload.username, action.payload.token);
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loggedIn = true;
        state.loadingStatus = 'idle';
        state.error = null;
        localStorage.setItem(action.payload.username, action.payload.token);
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
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
export const selectorLoadingStatus = (state) => state.user.loadingStatus;
export const selectorError = (state) => state.user.error;
// export const getUserInfo = (state) => Object.values(state.user.userInfo);
export const getUserInfo = createSelector(
  (state) => state.user.userInfo,
  (userInfo) => Object.values(userInfo), // мемоизирует  - если не меняется userInfo
);
export default userSlice;
