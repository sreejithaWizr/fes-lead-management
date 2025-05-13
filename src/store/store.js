
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';
import organisationsReducer from './organisationSlice'
import userReducer from './userSlice';
import rolesReducer from './roleSlice'

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    organisations: organisationsReducer,
    users: userReducer,
    roles: rolesReducer,
  },
});
