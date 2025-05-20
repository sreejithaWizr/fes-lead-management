<<<<<<< HEAD
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable, CustomPagination, CustomButton, CustomSearch } from 'react-mui-tailwind';
import EditIcon from "../../../assets/edit-icon.svg";
import DeleteIcon from "../../../assets/delete-icon.svg";
import DeletePopup from '../../../utils/DeletePopup';
import debounce from "lodash.debounce";

// import userAvatar from "../../assets/user-avatar.png";
import { getUserList } from '../../../api/services/settingsAPI/userAPI';
=======
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CustomTable, CustomPagination, CustomButton, CustomOffCanvasModal, CustomSearch } from 'react-mui-tailwind';
import EditIcon from "../../../assets/edit-icon.svg";
import FilterIcon from "../../../assets/filter.svg";
import FilterContent from '../../../pages/FilterContent';
import debounce from "lodash.debounce";
import DeleteIcon from "../../../assets/delete-icon.svg";
import DeletePopup from '../../../utils/DeletePopup';
import { getUserList } from '../../../api/services/settingsAPI/userAPI';

>>>>>>> testing/sprint2

const UserManagement = () => {

  const navigate = useNavigate();
  const { columns } = useSelector((state) => state.users);
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);  // <-- NEW
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filters, setFilters] = useState([]);
  const toggleFilter = () => setIsFilterOpen(prev => !prev);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [users, setUsers] = useState([]);


<<<<<<< HEAD
  // Dummy data for testing
  const dummyUsers = [
    {
      id: 1,
      userName: "Alice Thomas",
      userRole: "Admin",
      orgName:"123",
      orgType: "Private",
      userStatus: "Active",
      userBranch: "Kochi",
      leadSource: "Website",
    },
    {
      id: 2,
      userName: "Bob Mathew",
      userRole: "User",
      orgName:"123",
      orgType: "Public",
      userStatus: "Inactive",
      userBranch: "Bangalore",
      leadSource: "Referral",
    },
    {
      id: 3,
      userName: "Catherine Joseph",
      userRole: "Manager",
      orgName:"123",
      orgType: "Private",
      userStatus: "Pending",
      userBranch: "Chennai",
      leadSource: "Event",
    }
  ];

  useEffect(() => {
    // fetchUsersData();

    // mock data
    setUsers(dummyUsers);
  }, [currentPage]);

  const fetchUsersData = (
    customRowsPerPage = rowsPerPage,
    customPage = currentPage,
    customSearchTerm = searchTerm,
    customFilters = filters
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
      filterApplied: customFilters.length > 0
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
=======

  useEffect(() => {
    fetchUserData();
  }, [currentPage]);

>>>>>>> testing/sprint2

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



  const handleApplyFilter = (newFiltersArray) => {
    const filterMap = {};
    newFiltersArray.forEach(({ field, operator, value }) => {
      filterMap[field] = {
        condition: operator,
        value: Array.isArray(value)
          ? value.map(v => (typeof v === 'string' ? v : v.name))
          : []
      };
    });

    setSelectedFilters(filterMap); // Update selected filters for reinitialization
    setFilters(newFiltersArray); // Store transformed filters for API or UI
    setCurrentPage(1); // Reset to page 1 when filters applied
    fetchUserData(newFiltersArray); // Fetch data with new filters
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

<<<<<<< HEAD
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    fetchUsersData(newRowsPerPage, 1);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        fetchUsersData(filters, rowsPerPage, 1, value);
      }, 500),
    [filters, rowsPerPage] // Do NOT include searchTerm here
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log("value length: ", value.length);

    // Call the debounced function only if the length is 3 or more
    if (value.length >= 3) {
      console.log("inside if", value.length)
      debouncedSearch(value);
    }

    else if (value.length < 3) {
      console.log("inside else-if", value.length)
      fetchUsersData(rowsPerPage, 1, value);
    }
  };

=======
>>>>>>> testing/sprint2
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

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    fetchUserData(filters, newRowsPerPage, 1); // Pass newRowsPerPage and reset page to 1
  };


  const fetchUserData = (
    customFilters = filters,
    customRowsPerPage = rowsPerPage,
    customPage = currentPage,
    customSearchTerm = searchTerm
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
      filterApplied: customFilters.length > 0,
      search: customSearchTerm
    };

    getUserList(payload)
      .then(response => {
        const responseData = response?.data;
        setUser(responseData?.data || []);
        setTotalPages(responseData?.totalPages || 1);
      })
      .catch(error => {
        console.error('Error fetching leads:', error);
      });
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        console.log("inside", value)
        fetchUserData(filters, rowsPerPage, 1, value);
      }, 500),
    [filters, rowsPerPage] // Do NOT include `searchTerm` here
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 3 || value.length === 0) {
      debouncedSearch(value);
    }

  };

  return (
    <>
      {/* Header */}

      <div className="pt-3 flex flex-col">
        <div className="flex items-center justify-between" />
        <div className="flex items-center justify-between mb-6">
          <CustomSearch
            placeHolder="Search"
            width="264px"
            value={searchTerm}
            onChange={(e) => {
<<<<<<< HEAD
=======
              console.log("yyy")
>>>>>>> testing/sprint2
              setCurrentPage(1);
              handleChange(e);
            }}
          />

          <div className="flex items-center gap-4" />

          <div className="flex items-center gap-3">
            <CustomButton text="Add User" onClick={handleCreateUser} endIcon={false} />
            {/* <CustomButton variant="icon" showText={false} startIcon={true} endIcon={false} iconImg={FilterIcon} onClick={toggleFilter} /> */}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-card overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="min-w-max">
            <CustomTable
              columns={columns}
              data={user}
              showCheckboxes={false}
              getRow={getRow}
            />
          </div>
        </div>
      </div>

      {/* Pagination */}
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


      {/* Filter Panel */}
      {isFilterOpen && (
        <CustomOffCanvasModal
          isOpen={isFilterOpen}
          onClose={toggleFilter}
          title="Filter"
          position="right"
          width="649px"
        >
          <FilterContent
            onClose={toggleFilter}
            onApplyFilter={handleApplyFilter}
            initialFilters={selectedFilters}
            isFilterOpen={isFilterOpen}
          />
        </CustomOffCanvasModal>
      )}
    </>
  );
};

export default UserManagement;
