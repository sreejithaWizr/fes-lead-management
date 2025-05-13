
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';
<<<<<<< HEAD
import lorganisationsReducer from './organisationSlice'
=======
import userReducer from './userSlice';
import rolesReducer from './roleSlice'
>>>>>>> 6223ac2db33f5e5d947c1b69d4397a09c4458cc0

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
<<<<<<< HEAD
    organisations: lorganisationsReducer,
=======
    users: userReducer,
    roles: rolesReducer,
>>>>>>> 6223ac2db33f5e5d947c1b69d4397a09c4458cc0
  },
});
