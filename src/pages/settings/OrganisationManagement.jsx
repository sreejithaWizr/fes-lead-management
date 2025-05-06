import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable, CustomPagination, CustomButton, CustomOffCanvasModal, CustomSearch } from 'react-mui-tailwind';


import PhoneIcon from "../../assets/phone-icon.svg";
import CalenderIcon from "../../assets/calendar.svg";
import MailIcon from "../../assets/mail.svg";
import LocationIcon from "../../assets/location.svg";
import EditIcon from "../../assets/edit-icon.svg";
import FilterIcon from "../../assets/filter.svg";

import FilterContent from '../../pages/FilterContent';
import { getLeadList } from '../../api/services/leadAPI/leadAPIs';

const OrganisationManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { columns } = useSelector((state) => state.organisations);

    const [leads, setLeads] = useState([]);
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [totalPages, setTotalPages] = useState(1);  // <-- NEW
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [filters, setFilters] = useState([]);
    const toggleFilter = () => setIsFilterOpen(prev => !prev);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchLeadsData();
    }, [currentPage]);    


    // const handleView = () => {
    //   navigate('/leads/detailsview');
    // };

    const handleCreateLead = () => {
        navigate('/leads/create');
    };

    const handleView = (value) => {
        const selectedLeadId = leads.find(lead => lead.leadNumber === value);
        console.log("selectedLeadId", selectedLeadId);
        navigate(`/leads/detailsview/${selectedLeadId?.id}`);
    }

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
        fetchLeadsData(newFiltersArray); // Fetch data with new filters
    };

    const getRow = (columnId, value, row = {}) => {
        console.log("bb", row)
        switch (columnId) {
            case "leadNumber":
                return (
                    <div className="flex items-center gap-2">
                        <span className="font-bold cursor-pointer" onClick={() => handleView(value)}>
                            {value}
                        </span>
                    </div>
                );
            case "createdAt":
                return (
                    <div className="flex items-center gap-2">
                        <img src={CalenderIcon} alt="Calendar" className="w-4 h-4" />
                        <span>{value ? new Date(value).toLocaleDateString() : '-'}</span>
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
                            onClick={() => handleEdit(row)} // Pass the full row
                        />
                    </div>
                );
            default:
                return value;
        }
    };

    const handleEdit = (row) => {
        console.log("Row data:", row);
        navigate(`/leads/edit/${row?.id}`);
    };


    // const handleSelectAll = (e) => {
    //     if (e.target.checked) {
    //         setSelectedLeads(leads.map(lead => lead.id));
    //     } else {
    //         setSelectedLeads([]);
    //     }
    // };

    // const handleSelectLead = (e, leadId) => {
    //     if (e.target.checked) {
    //         setSelectedLeads([...selectedLeads, leadId]);
    //     } else {
    //         setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    //     }
    // };

    // const getStatusClass = (status) => {
    //     switch (status) {
    //         case 'Potential':
    //             return 'status-potential';
    //         case 'Inactive':
    //             return 'status-inactive';
    //         case 'Enrolled':
    //             return 'status-enrolled';
    //         case 'May be Prospective':
    //             return 'status-prospective';
    //         default:
    //             return value;
    //     }
    // };

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1);
        fetchLeadsData(filters, newRowsPerPage, 1); // Pass newRowsPerPage and reset page to 1
    };


    const fetchLeadsData = (
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
        

        getLeadList(payload)
            .then(response => {
                const responseData = response?.data;
                setLeads(responseData?.data || []);
                setTotalPages(responseData?.totalPages || 1);
            })
            .catch(error => {
                console.error('Error fetching leads:', error);
            });
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onSearch={(term) => {
                            if (term.length >= 3 || term.length === 0) {
                                setCurrentPage(1);
                                fetchLeadsData(filters, rowsPerPage, 1, term);
                            }
                        }}
                    />

                    <div className="flex items-center gap-4" />

                    <div className="flex items-center gap-3">
                        <CustomButton text="Add Organisation" onClick={handleCreateLead} endIcon={false} />
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
                            data={leads}
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

export default OrganisationManagement;
