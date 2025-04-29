import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads } from '../store/leadsSlice';
import { CustomTable, CustomPagination, CustomButton, CustomOffCanvasModal } from 'react-mui-tailwind';
import { getLeadList } from '../api/services/masterAPIs/createLeadApi';

import PhoneIcon from "../assets/phone-icon.svg";
import CalenderIcon from "../assets/calendar.svg";
import MailIcon from "../assets/mail.svg";
import LocationIcon from "../assets/location.svg";
import EditIcon from "../assets/edit-icon.svg";
import FilterIcon from "../assets/filter.svg";

import FilterContent from '../pages/FilterContent';

const LeadsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { columns } = useSelector((state) => state.leads);

  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);  // <-- NEW
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filters, setFilters] = useState([]);
  const toggleFilter = () => setIsFilterOpen(prev => !prev);

  useEffect(() => {
    fetchLeadsData();
  }, [currentPage]); // <--- add dependency

  const fetchLeadsData = (customFilters = filters) => {
    const output = customFilters.map(item => ({
      field: item.field,
      operator: item.operator.name,
      value: item.value.map(v => v.name)
    }));

    const payload = {
      filters: output,
      pageSize: 15,         // <- match your response pageSize
      pageNumber: currentPage,
      filterApplied: customFilters.length > 0
    };

    getLeadList(payload)
      .then(response => {
        const responseData = response?.data;

        setLeads(responseData?.data || []);
        setTotalPages(responseData?.totalPages || 1);  // <-- update total pages from API
        console.log("Fetched Leads:", response);
      })
      .catch(error => {
        console.error('Error fetching leads:', error);
      });
  };

  const handleView = () => {
    navigate('/leads/detailsview');
  };

  const handleEdit = () => {
    navigate('/leads/edit');
  };

  const handleCreateLead = () => {
    navigate('/leads/create');
  };

  const handleApplyFilter = (newFiltersArray) => {
    const filterMap = {};
    newFiltersArray.forEach(({ field, operator, value }) => {
      filterMap[field] = {
        condition: operator,
        value: value.length > 1 ? value : value[0] || '', // Use array for multiple values, single value otherwise
      };
    });

    setSelectedFilters(filterMap); // Update selected filters for reinitialization
    setFilters(newFiltersArray); // Store transformed filters for API or UI
    setCurrentPage(1); // Reset to page 1 when filters applied
    fetchLeadsData(newFiltersArray); // Fetch data with new filters
  };

  const getRow = (columnId, value) => {
    if (!columnId) {
      return (
        <div className="flex items-center gap-2">
          <img
            src={EditIcon}
            alt="Edit"
            className="w-4 h-4 cursor-pointer"
            onClick={handleEdit}
          />
        </div>
      );
    }

    switch (columnId) {
      case "leadNumber":
        return (
          <div className="flex items-center gap-2">
            <span className="font-bold cursor-pointer" onClick={handleView}>{value}</span>
          </div>
        );
      case "createdAt":
        return (
          <div className="flex items-center gap-2">
            <img src={CalenderIcon} alt="Calendar" className="w-4 h-4" />
            <span>{new Date(value).toLocaleDateString()}</span> {/* optional: formatted date */}
          </div>
        );
      case "mobileNumber":
        return (
          <div className="flex items-center gap-2">
            <img src={PhoneIcon} alt="Phone" className="w-4 h-4" />
            <span>{value}</span>
          </div>
        );
      case "email":
        return (
          <div className="flex items-center gap-2">
            <img src={MailIcon} alt="Mail" className="w-4 h-4" />
            <span>{value}</span>
          </div>
        );
      case "location":
        return (
          <div className="flex items-center gap-2">
            <img src={LocationIcon} alt="Location" className="w-4 h-4" />
            <span>{value}</span>
          </div>
        );
      case "action":
        return (
          <div className="flex items-center gap-2">
            <img
              src={EditIcon}
              alt="Edit"
              className="w-4 h-4 cursor-pointer"
              onClick={handleEdit}
            />
          </div>
        );
      default:
        return value;
    }
  };


  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // reset to page 1
    fetchLeadsData(filters); // re-fetch API with new pageSize
  };


  return (
    <>
      {/* Header */}
      <div className="pt-2 px-6 flex flex-col gap-6">
        <div className="flex items-center justify-between" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4" />
          <div className="flex items-center gap-3">
            <CustomButton text="Create Lead" onClick={handleCreateLead} />
            <CustomButton variant="icon" showText={false} startIcon={true} endIcon={false} iconImg={FilterIcon} onClick={toggleFilter} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-card overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="min-w-max">
            <CustomTable
              columns={columns}
              data={leads}
              showCheckboxes={true}
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
          />
        </CustomOffCanvasModal>
      )}
    </>
  );
};

export default LeadsTable;
