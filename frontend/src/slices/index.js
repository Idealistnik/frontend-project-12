import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import channelSlice from './channelSlice';
import messagesSlice from './messagesSlice';
import uiSlice from './uiSlice';

export default configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [channelSlice.name]: channelSlice.reducer,
    [messagesSlice.name]: messagesSlice.reducer,
    [uiSlice.name]: uiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
