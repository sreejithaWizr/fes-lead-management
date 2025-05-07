import { createSlice } from '@reduxjs/toolkit';

const columns = [
    { column: "userName", label: "Name", id: "userName", showSort: true, isDrag: false, isFilter: true },
    { column: "userRole", label: "Role", id: "userRole", showSort: true, isDrag: false, isFilter: true },
    { column: "userStatus", label: "Status", id: "userStatus", showSort: true, isDrag: false, isFilter: true },
    { column: "userBranch", label: "Branch", id: "userBranch", showSort: true, isDrag: false, isFilter: true },
    { column: "leadSource", label: "Lead Source", id: "leadSource", showSort: true, isDrag: false, isFilter: true },
    { column: "action", label: "Actions", id: "action", showSort: false, isDrag: false, isFilter: false },
];

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle',
        error: null,
        currentPage: 1,
        itemsPerPage: 15,
        totalUsers: 0,
        columns: columns,
    },
});

export const { setCurrentPage, setItemsPerPage } = userSlice.actions;
export default userSlice.reducer;
