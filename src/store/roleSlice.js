import { createSlice } from '@reduxjs/toolkit';

const columns = [
  { column: "roleName", label: "Role Name", id: "roleName", showSort: true, isDrag: true, isFilter: true },
  { column: "roleType", label: "Role Type", id: "roleType", showSort: true, isDrag: true, isFilter: true },
  { column: "description", label: "Description", id: "description", showSort: true, isDrag: true, isFilter: true },
  { column: "parentRole", label: "Parent Role", id: "parentRole", showSort: true, isDrag: true, isFilter: true },
  { column: "organization", label: "Organization", id: "organization", showSort: true, isDrag: true, isFilter: true },
  { column: "action", label: "Actions", id: "action", showSort: false, isDrag: true, isFilter: false },
];

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1,
    itemsPerPage: 15,
    totalLeads: 10,
    columns: columns,
  },
});


export default rolesSlice.reducer;
