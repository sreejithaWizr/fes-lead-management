
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';
import rolesReducer from './roleSlice'

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    roles: rolesReducer,
  },
});
