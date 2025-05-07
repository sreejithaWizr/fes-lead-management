import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';
import bulkUploadReducer from './bulkSlice';

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    bulkUpload: bulkUploadReducer,
  },
});