
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';
import lorganisationsReducer from './organisationSlice'
import userReducer from './userSlice';
import rolesReducer from './roleSlice'

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    organisations: lorganisationsReducer,
    users: userReducer,
    roles: rolesReducer,
  },
});
