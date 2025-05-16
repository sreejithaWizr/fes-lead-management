
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Sample data for the custom table
const columns = [
//   { column: "leadNo", label: "Lead No", id: "leadNumber", showSort: true, isDrag: true, isFilter: true },
  { column: "organizationName", label: "Org Name", id: "organizationName", showSort: true, isDrag: false, isFilter: true },
  { column: "organizationType", label: "Type", id: "organizationType", showSort: true, isDrag: false, isFilter: true },
  { column: "country", label: "Country", id: "country", showSort: true, isDrag: false, isFilter: true },
  { column: "businessEmail", label: "Business Email", id: "businessEmail", showSort: true, isDrag: false, isFilter: true },
  { column: "contactNumber", label: "Contact Number", id: "contactNumber", showSort: true, isDrag: false, isFilter: true },
  // { column: "user", label: "Primary Admin User", id: "user", showSort: true, isDrag: false, isFilter: true },
  { column: "status", label: "Status", id: "status", showSort: true, isDrag: false, isFilter: false },
  { column: "notes", label: "Notes", id: "notes", showSort: true, isDrag: false, isFilter: true },
  { column: "action", label: "Actions", id: "action", showSort: false, isDrag: false, isFilter: false },
];


const organisationSlice = createSlice({
  name: 'organisations',
  initialState: {
    organisations: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1,
    itemsPerPage: 15,
    totalLeads: 20,
    columns: columns,
  },
  
});

export const { setCurrentPage, setItemsPerPage } = organisationSlice.actions;

export default organisationSlice.reducer;
