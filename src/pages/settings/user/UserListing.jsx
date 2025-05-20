import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from "../../../assets/edit-icon.svg";
import DeleteIcon from "../../../assets/delete-icon.svg";
import DeletePopup from '../../../utils/DeletePopup';

// import userAvatar from "../../assets/user-avatar.png";
import { getUserList } from '../../../api/services/settingsAPI/userAPI';

const UserManagement = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { columns } = useSelector((state) => state.users);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState([]);

  // Dummy data for testing
  // const dummyUsers = [
  //   {
  //     id: 1,
  //     userName: "Alice Thomas",
  //     userRole: "Admin",
  //     userStatus: "Active",
  //     userBranch: "Kochi",
  //     leadSource: "Website",
  //   },
  //   {
  //     id: 2,
  //     userName: "Bob Mathew",
  //     userRole: "User",
  //     userStatus: "Inactive",
  //     userBranch: "Bangalore",
  //     leadSource: "Referral",
  //   },
  //   {
  //     id: 3,
  //     userName: "Catherine Joseph",
  //     userRole: "Manager",
  //     userStatus: "Pending",
  //     userBranch: "Chennai",
  //     leadSource: "Event",
  //   },
  // ];

  useEffect(() => {
    fetchUsersData();
  }, [currentPage]);

  const handleCreateUser = () => {
    navigate('/users/create');
  };

  const handleView = (value) => {
    const selectedUser = users.find(user => user.userName === value);
    navigate(`/users/detailsview/${selectedUser?.id}`);
  };

  const handleEdit = (row) => {
    navigate(`/users/edit/${row?.id}`);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      console.log("Deleting user:", selectedRow.userName);

      // Example: remove from local list
      setUsers((prev) => prev.filter(user => user.id !== selectedRow.id));
    }
    setIsDeleteOpen(false);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    fetchUsersData(newRowsPerPage, 1);
  };

  const fetchUsersData = (
    customRowsPerPage = rowsPerPage,
    customPage = currentPage,
    customFilters = filters,
  ) => {
    const output = customFilters.map(item => ({
      field: item.field,
      operator: typeof item.operator === 'string' ? item.operator : item.operator.name,
      value: Array.isArray(item.value)
        ? item.value.map(v => (typeof v === 'string' ? v : v.name))
        : []
    }));

    const payload = {
      filters: output,
      pageSize: customRowsPerPage,
      pageNumber: customPage,
      search: customSearchTerm,
      filterApplied: customFilters.length > 0,
    };

    getUserList(payload)
      .then(response => {
        const responseData = response?.data;
        setUsers(responseData?.data || []);
        setTotalPages(responseData?.totalPages || 1);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const getRow = (columnId, value, row = {}) => {
    switch (columnId) {
      case "userName":
        return (
          // <span className="font-bold cursor-pointer" onClick={() => handleView(value)}>
          //   {value}
          // </span>
          <div className="flex items-center gap-3">
            {/* <img
              src={userAvatar}
              alt={value}
              className="w-8 h-8 rounded-full object-cover"
            /> */}
            <span className="font-bold cursor-pointer" onClick={() => handleView(value)}>
              {value}
            </span>
          </div>
        );
      case "userRole":
      case "orgName":
      case "orgType":
      case "userStatus":
        const statusColor =
          value === "Active" ? "#14AE5C" : value === "Inactive" ? "#FF8400" : undefined;

        return (
          <span
            className="font-semibold"
            style={{ color: statusColor }}
          >
            {value}
          </span>
        );
      case "userBranch":
        return <span>{value}</span>;
      case "action":
        return (
          <div className='flex items-center gap-4'>
            <img
              src={EditIcon}
              alt="Edit"
              className="w-4 h-4 cursor-pointer"
              onClick={() => handleEdit(row)}
            />
            <img
              src={DeleteIcon}
              alt="Delete"
              className="w-4 h-4 cursor-pointer"
              onClick={() => handleDelete(row)}
            />
          </div>
        );
      default:
        return value;
    }
  };
  return (
    <div>
      <div className="pt-3 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <CustomButton text="Add User" onClick={handleCreateUser} endIcon={false} />
        </div>
      </div>

      <div className="bg-white shadow-card overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="min-w-max">
            <CustomTable
              columns={columns}
              data={users}
              showCheckboxes={false}
              getRow={getRow}
            />
          </div>
        </div>
      </div>

      <div className="p-4 flex justify-end">
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={handleRowsPerPageChange}
        />
      </div>

      {isDeleteOpen && (
        <DeletePopup
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={confirmDelete}
          title={`Are you sure you want to delete ${selectedRow?.userName}?`}
        />
      )}

    </div>
  );
};

export default UserManagement;
