/* eslint-disable no-param-reassign */
import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.login(), values);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue({
          status: error.response.status,
        });
      }
      if (!error.response) {
        return rejectWithValue({
          status: 'Network Error',
        });
      }
      return rejectWithValue({
        status: 'Unknown error',
      });
    }
  },
);

export const fetchSignIn = createAsyncThunk(
  'user/fetchSignIn',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.signup(), values);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return rejectWithValue({
          status: error.response.status,
        });
      }
      if (!error.response) {
        return rejectWithValue({
          status: 'Network Error',
        });
      }
      return rejectWithValue({
        status: 'Unknown error',
      });
    }
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
    // setUserInfoToStorage: (state, action) => {
    //   localStorage.setItem(action.payload.username, action.payload.token);
    // },
    // setUserInfo: (state, action) => {
    //   state.userInfo = action.payload;
    // },
    // setLoggedIn: (state) => {
    //   state.loggedIn = true;
    // },
    setLoggedOut: (state) => {
      state.loggedIn = false;
      state.userInfo = {};
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
        state.error = action.payload.status;
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
        state.error = action.payload.status;
      });
  },
});

export const {
  // setUserInfo,
  // setLoggedIn,
  setLoggedOut,
  // setUserInfoToStorage,
} = userSlice.actions;
export const selectorLoggedIn = (state) => state.user.loggedIn;
export const selectorLoadingStatus = (state) => state.user.loadingStatus;
export const selectorError = (state) => state.user.error;
export const getUserInfo = createSelector(
  (state) => state.user.userInfo,
  (userInfo) => Object.values(userInfo),
);
export default userSlice;
