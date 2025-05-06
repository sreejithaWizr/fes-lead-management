
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';
import lorganisationsReducer from './organisationSlice'

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    organisations: lorganisationsReducer,
  },
});
