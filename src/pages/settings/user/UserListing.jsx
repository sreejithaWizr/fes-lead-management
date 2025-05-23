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
import { getUserList, deleteUser } from '../../../api/services/settingsAPI/userAPI';

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

  useEffect(() => {
    fetchUserData();
  }, [currentPage]);


  const handleCreateUser = () => {
    navigate('/users/create');
  };

  const handleView = (row) => {
    navigate(`/users/view/${row?.id}`);
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

  const confirmDelete = async () => {
    // if (selectedRow) {
    //   // Example: remove from local list
    //   setUsers((prev) => prev.filter(user => user.id !== selectedRow.id));
    // }
    // setIsDeleteOpen(false);

    try {
      await deleteUser(selectedRow.id);
      setIsDeleteOpen(false);
      setSelectedRow(null);
      fetchUserData(); // re-fetch user list after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const getRow = (columnId, value, row = {}) => {
    switch (columnId) {
      case "userName":
        return (
          <div className="flex items-center gap-3">
            {/* <img
              src={userAvatar}
              alt={value}
              className="w-8 h-8 rounded-full object-cover"
            /> */}
            <span className="font-bold cursor-pointer" onClick={() => handleView(row)}>
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
    [filters, rowsPerPage]
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
              console.log("yyy")
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
          title={
            <>
              Are you sure you want to delete <strong> {selectedRow?.userName} ? </strong>
            </>
          }
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
