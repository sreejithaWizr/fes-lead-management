
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Sample lead data
const sampleLeads = [
  { id: "LEAD355451001", firstName: "Antony", lastName: "Dasan", status: "Potential", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Meta", location: "Australia" },
  { id: "LEAD355452001", firstName: "Nandhana", lastName: "Krishnan", status: "Inactive", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Meta", location: "Canada" },
  { id: "LEAD355453001", firstName: "Antony", lastName: "Dasan", status: "Enrolled", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Google Ads", location: "Australia" },
  { id: "LEAD355454001", firstName: "Nandhana", lastName: "Krishnan", status: "May be Prospective", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Google Ads", location: "Canada" },
  { id: "LEAD355455001", firstName: "Antony", lastName: "Dasan", status: "Enrolled", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Meta", location: "Australia" },
  { id: "LEAD355456001", firstName: "Nandhana", lastName: "Krishnan", status: "Potential", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Meta", location: "Canada" },
  { id: "LEAD355457001", firstName: "Antony", lastName: "Dasan", status: "May be Prospective", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Google Ads", location: "Australia" },
  { id: "LEAD355458001", firstName: "Nandhana", lastName: "Krishnan", status: "Potential", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Meta", location: "Canada" },
  { id: "LEAD355459001", firstName: "Antony", lastName: "Dasan", status: "Enrolled", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Google Ads", location: "Australia" },
  { id: "LEAD355460001", firstName: "Nandhana", lastName: "Krishnan", status: "May be Prospective", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Meta", location: "Canada" },
  { id: "LEAD355461001", firstName: "Antony", lastName: "Dasan", status: "Potential", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Meta", location: "Australia" },
  { id: "LEAD355462001", firstName: "Nandhana", lastName: "Krishnan", status: "May be Prospective", branch: "Kochi", createdDate: "12 Dec, 2020", phone: "(884) 819-3264", email: "test@gmail.com", leadSource: "Google Ads", location: "Canada" },
];

// Async thunk for fetching leads
export const fetchLeads = createAsyncThunk(
  'leads/fetchLeads',
  async (_, { rejectWithValue }) => {
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      return sampleLeads;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a new lead
export const createLead = createAsyncThunk(
  'leads/createLead',
  async (leadData, { rejectWithValue }) => {
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      // Generate a random ID for the new lead
      const newLeadId = `LEAD${Math.floor(Math.random() * 900000) + 100000}`;
      return { id: newLeadId, ...leadData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState: {
    leads: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    totalLeads: 8467, // Hardcoded from the UI
    currentPage: 1,
    itemsPerPage: 15,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.leads.unshift(action.payload);
      });
  },
});

export const { setCurrentPage, setItemsPerPage } = leadsSlice.actions;

export default leadsSlice.reducer;
