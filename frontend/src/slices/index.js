import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import channelSlice from './channelSlice';
import messagesSlice from './messagesSlice';

export default configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [channelSlice.name]: channelSlice.reducer,
    [messagesSlice.name]: messagesSlice.reducer,
  },
});
