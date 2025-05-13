import { createSlice } from '@reduxjs/toolkit';

const columns = [
    { column: "userName", label: "Name", id: "userName", showSort: true, isDrag: true, isFilter: true },
    { column: "userRole", label: "Role", id: "userRole", showSort: true, isDrag: true, isFilter: true },
    { column: "orgName", label: "Org Name", id: "orgName", showSort: true, isDrag: true, isFilter: true },
    { column: "orgType", label: "Org Type", id: "orgType", showSort: true, isDrag: true, isFilter: true },
    { column: "userStatus", label: "Status", id: "userStatus", showSort: true, isDrag: true, isFilter: true },
    { column: "userBranch", label: "Branch", id: "userBranch", showSort: true, isDrag: true, isFilter: true },
    { column: "action", label: "Actions", id: "action", showSort: false, isDrag: true, isFilter: false },
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
