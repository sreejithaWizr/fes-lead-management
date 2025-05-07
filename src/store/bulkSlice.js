import { createSlice } from '@reduxjs/toolkit';

const bulkSlice = createSlice({
  name: 'bulkUpload',
  initialState: {
    jobId: null,
    status: null,
    message: null,
  },
  reducers: {
    setJobId(state, action) {
      state.jobId = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    clearJobId(state) {
      state.jobId = null;
      state.status = null;
      state.message = null;
    },
  },
});

export const { setJobId, setStatus, clearJobId } = bulkSlice.actions;
export default bulkSlice.reducer;