import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import {
  CustomTable,
  CustomPagination,
  CustomButton,
  CustomOffCanvasModal,
  CustomSearch,
} from "react-mui-tailwind";
import PhoneIcon from "../../assets/phone-icon.svg";
import CalenderIcon from "../../assets/calendar.svg";
// import MailIcon from "../../assets/mail.svg";
import LocationIcon from "../../assets/location.svg";
import EditIcon from "../../assets/edit-icon.svg";
// import FilterIcon from "../../assets/filter.svg";
import FilterContent from "../../pages/FilterContent";
import { getRoleList } from "../../api/services/settingsAPI/roleAPIs";

const RoleManagement = () => {
  const navigate = useNavigate();
  const { columns } = useSelector((state) => state.roles);
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  useEffect(() => {
    let payload = {
      filters: [],
      pageSize: rowsPerPage,
      pageNumber: 1,
      filterApplied: false,
    };
    getRoleList(payload)
      .then((response) => {
        const responseData = response?.data;
        console.log("responseData", responseData);
        setRoles(responseData?.data || []);
        setTotalPages(responseData?.totalPages || 1);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  useEffect(() => {
    fetchRolesData();
  }, [currentPage]);

  const handleCreateRole = () => {
    navigate("/settings/role/create");
  };

  const handleView = (row) => {
    navigate(`/settings/role/view/${row?.id}`);
  };

  const handleApplyFilter = (newFiltersArray) => {
    const filterMap = {};
    newFiltersArray.forEach(({ field, operator, value }) => {
      filterMap[field] = {
        condition: operator,
        value: Array.isArray(value)
          ? value.map((v) => (typeof v === "string" ? v : v.name))
          : [],
      };
    });

    setSelectedFilters(filterMap); // Update selected filters for reinitialization
    setFilters(newFiltersArray); // Store transformed filters for API or UI
    setCurrentPage(1); // Reset to page 1 when filters applied
    fetchRolesData(newFiltersArray); // Fetch data with new filters
  };

  const getRow = (columnId, value, row = {}) => {
    console.log("kkkkkkkkk", row);
    switch (columnId) {
      case "roleName":
        return (
          <div className="flex items-center gap-2 max-w-[300px] break-all">
            <span
              className="cursor-pointer whitespace-normal break-all"
              onClick={() => handleView(row)}
            >
              {value}
            </span>
          </div>
        );
      case "description":
        return (
          <div className="flex items-center gap-2 max-w-[300px] break-all">
            <span className="whitespace-normal break-all">
              {value ? value : "-"}
            </span>
          </div>
        );
      case "action":
        return (
          <div className="flex items-center gap-2">
            <img
              src={EditIcon}
              alt="Edit"
              className="w-4 h-4 cursor-pointer"
              onClick={() => handleEdit(row)}
            />
          </div>
        );
      default:
        return value;
    }
  };

  const handleEdit = (row) => {
    console.log("Row data:", row);
    navigate(`/settings/role/edit/${row?.id}`);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    fetchRolesData(filters, newRowsPerPage, 1); // Pass newRowsPerPage and reset page to 1
  };

  const fetchRolesData = (
    customFilters = filters,
    customRowsPerPage = rowsPerPage,
    customPage = currentPage,
    customSearchTerm = searchTerm
  ) => {
    const output = customFilters.map((item) => ({
      field: item.field,
      operator:
        typeof item.operator === "string" ? item.operator : item.operator.name,
      value: Array.isArray(item.value)
        ? item.value.map((v) => (typeof v === "string" ? v : v.name))
        : [],
    }));

    const payload = {
      filters: output,
      pageSize: customRowsPerPage,
      pageNumber: customPage,
      filterApplied: customFilters.length > 0,
      search: customSearchTerm,
    };

    getRoleList(payload)
      .then((response) => {
        const responseData = response?.data;
        setRoles(responseData?.data || []);
        setTotalPages(responseData?.totalPages || 1);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        console.log("inside", value);
        fetchRolesData(filters, rowsPerPage, 1, value);
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
      <div className="pt-4 pb-8 flex flex-col">
        <div className="flex items-center justify-between" />
        <div className="flex items-center justify-between">
          <CustomSearch
            placeHolder="Search"
            width="264px"
            value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            onChange={(e) => {
              setCurrentPage(1);
              handleChange(e);
            }}
          />

          <div className="flex items-center gap-4" />
          <div className="flex items-center gap-3">
            <CustomButton
              text="Add Role"
              onClick={handleCreateRole}
              endIcon={false}
            />
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
              data={roles}
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

export default RoleManagement;
