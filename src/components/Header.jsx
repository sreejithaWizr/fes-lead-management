import React, { useEffect, useState } from 'react';
import { Search, RefreshCw, Filter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserProf from "../assets/user-image.svg";
import FilterIcon from "../assets/filter.svg";
import MenuIcon from "../assets/menu.svg";
import RefreshIcon from "../assets/refresh.svg";
import { CustomButton, CustomSearch, CustomDropDown, CustomOffCanvasModal } from "react-mui-tailwind";
import FilterContent from '../pages/FilterContent';
import LeftArrowIcon from "../assets/arrow-left.svg";
import RightArrowIcon from "../assets/arrow-right.svg";
import { formRef } from '../pages/CreateLeadPage';
import { getLeadList } from '../api/services/masterAPIs/createLeadApi';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCreateLeadPage = location.pathname.startsWith('/leads/create');
  const isLeadDetailsViewPage = location.pathname.startsWith('/leads/detailsview');
  const isBulkUploadPage = location.pathname.startsWith('/bulk');
  const [filters, setFilters] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({});


  const fetchLeads = (customFilters = filters) => {

    const output = customFilters.map(item => ({
      field: item.field, // or manually set "firstname" if you want
      operator: item.operator.name,
      value: item.value.map(v => v.name)
    }));
    
    const payload = {
      filters: output,
      pageSize,
      pageNumber,
      filterApplied: true
    };
  };

  // Initial load
  useEffect(() => {
    fetchLeads();
  }, []);



  const handleCreateLead = () => {
    navigate('/leads/create');
  };

  const handleCancel = () => {
    navigate('/leads');
  };

  const handleFormSubmit = () => {
    if (formRef.current) {
      // Set all fields as touched to trigger validation
      formRef.current.setTouched(
        Object.keys(formRef.current.values).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );

      formRef.current.submitForm();
      
    }
  };

  const handleApplyFilter = (newFiltersArray) => {
    // Convert array format to object for internal use
    const filterMap = {};
    newFiltersArray.forEach(({ field, operator, value }) => {
      filterMap[field] = { condition: operator, value: value[0] };
    });
    setSelectedFilters(filterMap); // for form prefill
    setFilters(newFiltersArray);   // for API usage
    fetchLeads(newFiltersArray);   // trigger API
  };


  return (
    <>
      <header className="w-full shadow-card ">

        {isCreateLeadPage && (
          <div className="pt-6 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={LeftArrowIcon}
                alt="FES Logo"
                className="size-[24px] rounded-md cursor-pointer"
                onClick={handleCancel}
              />
              <div className="flex items-center gap-2">
                <h1
                  className="font-proxima font-bold text-[28px] leading-[140%] align-middle text-[#17222B]">
                  Create a new lead
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CustomButton text="Cancel" variant="secondary" startIcon={false} endIcon={false} onClick={handleCancel} />
              <CustomButton text="Submit" startIcon={false} endIcon={true} iconImg={RightArrowIcon} onClick={handleFormSubmit} />
            </div>
          </div>
        )}

        {isLeadDetailsViewPage && (
          <div className="pt-6 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={LeftArrowIcon}
                alt="FES Logo"
                className="size-[24px] rounded-md cursor-pointer"
                onClick={handleCancel}
              />
              <div className="flex items-center gap-2">
                <h1
                  className="font-proxima font-bold text-[28px] leading-[140%] align-middle text-[#17222B]">
                  Lead Details
                </h1>
              </div>
            </div>

            {/* <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <CustomSearch />
              </div>
              <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={RefreshIcon} />
            </div> */}
          </div>
        )}
         {isBulkUploadPage && (
          <div className="pt-6 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={LeftArrowIcon}
                alt="FES Logo"
                className="size-[24px] rounded-md cursor-pointer"
                onClick={handleCancel}
              />
              <div className="flex items-center gap-2">
                <h1
                  className="font-proxima font-bold text-[28px] leading-[140%] align-middle text-[#17222B]">
                   Bulk Import
                </h1>
              </div>
            </div>
          </div>
        )}
      </header>

    </>
  );
};

export default Header;
