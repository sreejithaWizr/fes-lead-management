
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for initial leads
const initialLeads = [
  {
    id: 'LEAD001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    status: 'Potential',
    branch: 'Kochi',
    createdDate: '10 Sep 2023',
    leadSource: 'Website',
    location: 'Kochi, India',
  },
  {
    id: 'LEAD002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '(987) 654-3210',
    status: 'Enrolled',
    branch: 'Kochi',
    createdDate: '15 Oct 2023',
    leadSource: 'Meta',
    location: 'Kochi, India',
  },
  {
    id: 'LEAD003',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@example.com',
    phone: '(555) 123-4567',
    status: 'Inactive',
    branch: 'Kochi',
    createdDate: '05 Aug 2023',
    leadSource: 'Google Ads',
    location: 'Kochi, India',
  },
  {
    id: 'LEAD004',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    phone: '(222) 333-4444',
    status: 'May be Prospective',
    branch: 'Kochi',
    createdDate: '22 Nov 2023',
    leadSource: 'Referral',
    location: 'Kochi, India',
  },
  {
    id: 'LEAD005',
    firstName: 'Robert',
    lastName: 'Wilson',
    email: 'robert.w@example.com',
    phone: '(777) 888-9999',
    status: 'Potential',
    branch: 'Kochi',
    createdDate: '30 Dec 2023',
    leadSource: 'Website',
    location: 'Kochi, India',
  },
];

// Simulate API call to fetch leads
export const fetchLeads = createAsyncThunk(
  'leads/fetchLeads',
  async (_, { getState }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Use mock data
    return initialLeads;
  }
);

// Simulate API call to create a lead
export const createLead = createAsyncThunk(
  'leads/createLead',
  async (leadData, { getState }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create a new lead with the form data
    const newLead = {
      id: leadData.leadNumber,
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      email: leadData.email,
      phone: leadData.mobileNumber,
      status: leadData.leadStatus,
      branch: 'Kochi',
      createdDate: new Date().toLocaleDateString('en-US', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      leadSource: leadData.leadSource,
      location: 'Kochi, India',
      // Additional fields can be added as needed
    };
    
    return newLead;
  }
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState: {
    leads: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1,
    itemsPerPage: 15,
    totalLeads: initialLeads.length,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page when changing items per page
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
        state.totalLeads = action.payload.length;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createLead.pending, (state) => {
        // Handle pending state if needed
      })
      .addCase(createLead.fulfilled, (state, action) => {
        // Add the new lead to the leads array
        state.leads.unshift(action.payload);
        state.totalLeads = state.leads.length;
      })
      .addCase(createLead.rejected, (state, action) => {
        // Handle error if needed
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setItemsPerPage } = leadsSlice.actions;

export default leadsSlice.reducer;
