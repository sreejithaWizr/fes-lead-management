import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CustomTable, CustomPagination, CustomButton, CustomOffCanvasModal, CustomSearch } from 'react-mui-tailwind';
import EditIcon from "../../assets/edit-icon.svg";
import FilterIcon from "../../assets/filter.svg";
import FilterContent from '../../pages/FilterContent';
import { getLeadList } from '../../api/services/leadAPI/leadAPIs';
import debounce from "lodash.debounce";
import { getOrganisationList } from '../../api/services/settingsAPI/organisationAPI';
import DeleteIcon from "../../assets/delete-icon.svg";
import DeletePopup from '../../utils/DeletePopup';


const OrganisationManagement = () => {

    const navigate = useNavigate();
    const { columns } = useSelector((state) => state.organisations);
    const [org, setOrg] = useState([]);
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
    const [organisations, setOrganisations] = useState([]);

    useEffect(() => {
        fetchLeadsData();
    }, [currentPage]);


    const handleCreateOrg = () => {
        navigate('/settings/organisation/create');
    };

    const handleView = (value) => {
        const selectedOrgId = org.find(organisation => organisation.organizationName === value);
        console.log("selectedOrgId", selectedOrgId);
        navigate(`/settings/organisation/detailsview/${selectedOrgId?.id}`);
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

    const handleDelete = (row) => {
        setSelectedRow(row);
        setIsDeleteOpen(true);
    };

    const confirmDelete = () => {
        if (selectedRow) {
            console.log("Deleting organisation:", selectedRow.organizationName);

            // Example: remove from local list
            setOrganisations((prev) => prev.filter(organisation => organisation.id !== selectedRow.id));
        }
        setIsDeleteOpen(false);
    };

    const getRow = (columnId, value, row = {}) => {
        switch (columnId) {
            case "organizationName":
                return (
                    <div className="flex items-center gap-2">
                        <span className="font-bold cursor-pointer" onClick={() => handleView(value)}>
                            {value}
                        </span>
                    </div>
                );
            case "status":
                return (
                    <span
                        className={`inline-flex items-center justify-center font-bold ${getStatusClass(value)}`}
                        style={{
                            fontSize: "11px",
                            lineHeight: "15.4px", // 140% of 11px
                            width: value ? '56px' : '64px',
                            height: '23px',
                            padding: '4px 12px',
                            borderRadius: '4px', // Assuming Corner/Small = 4px
                        }}
                    >
                        {value ? "Active" : "Inactive"}
                    </span>
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

    const getStatusClass = (status) => {
        switch (status) {
            case true:
                return 'text-[#14AE5C] bg-[#EBF5ED]';
            case false:
                return 'text-[#EC221F] bg-[#FDE9E9]';
            default:
                return 'text-gray-700 bg-gray-100';
        }
    };


    const handleEdit = (row) => {
        console.log("Row data:", row);
        navigate(`/settings/organisation/edit/${row?.id}`);
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


        getOrganisationList(payload)
            .then(response => {
                const responseData = response?.data;
                setOrg(responseData?.data || []);
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
                fetchLeadsData(filters, rowsPerPage, 1, value);
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
                            console.log("yyy")
                            setCurrentPage(1);
                            handleChange(e);
                        }}
                    />

                    <div className="flex items-center gap-4" />

                    <div className="flex items-center gap-3">
                        <CustomButton text="Add Organisation" onClick={handleCreateOrg} endIcon={false} />
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
                            data={org}
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

export default OrganisationManagement;
