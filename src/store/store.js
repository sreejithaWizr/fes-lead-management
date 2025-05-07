
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    users: userReducer,
  },
});
