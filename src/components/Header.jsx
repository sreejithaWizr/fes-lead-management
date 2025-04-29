import React, { useState } from 'react';
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

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLeadsPage = location.pathname === '/leads';
  const isCreateLeadPage = location.pathname.startsWith('/leads/create');
  const isLeadDetailsViewPage = location.pathname.startsWith('/leads/detailsview');

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => setIsFilterOpen(prev => !prev);


  const handleCreateLead = () => {
    navigate('/leads/create');
  };

  const handleCancel = () => {
    navigate('/leads');
  };

  const handleSubmit = () => {
    // Submit form logic would go here
    // navigate('/leads');
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
      // formRef.current.validateForm().then(errors => {
      //   if (Object.keys(errors).length === 0) {
      //     // No errors, submit the form
      //     formRef.current.submitForm();
      //   } else {
      //     console.log('Form has validation errors:', errors);
      //     // Form has errors, don't submit
      //   }
      // });
    }
  };

  console.log("value", isFilterOpen)
  return (
    <>
      <header className="w-full shadow-card ">
        {isLeadsPage && (
          <div className="pt-2 px-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              {/* <div className="flex items-center gap-4">
                <img
                  src={UserProf}
                  alt="Profile"
                  className="w-[61px] h-[61px] rounded-[12px]"

                />
                <div>
                  <h2 className="text-sm font-normal text-[#757575]">Hello,</h2>
                  <h1 className="text-base font-medium">Deego Chaithanyan!</h1>
                </div>
              </div> */}

              {/* <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <CustomSearch />
                </div>
                <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={RefreshIcon} />
              </div> */}

            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* <h2 className="text-lg font-medium">Kochi Leads</h2>
              <span className="bg-primary text-white px-2 py-0.5 rounded-md text-xs font-medium">8,467</span> */}
                {/* <CustomDropDown options={[
                  { name: "Kochi Leads", count: 8467 },
                  { name: "Mumbai Leads", count: 5321 },
                  { name: "Delhi Leads", count: 6789 }
                ]}
                  // required={true}
                  placeHolder="Select Branch"
                /> */}
              </div>

              <div className="flex items-center gap-3 w-[405px]">
                <CustomButton text="Create Lead" endIcon={false} onClick={handleCreateLead} />
                <CustomButton text="Bulk Upload" variant="secondary" endIcon={false} />
                <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={FilterIcon} onClick={() => toggleFilter()} />
                {/* <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={MenuIcon} /> */}
              </div>
            </div>
          </div>
        )}

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
      </header>
      {isFilterOpen && (
        <CustomOffCanvasModal
          isOpen={isFilterOpen}
          onClose={toggleFilter}
          title="Filter"
          position="right" // ensure it's from left
          width="649px"
        >
          <FilterContent onClose={toggleFilter} />
        </CustomOffCanvasModal>
      )}

    </>
  );
};

export default Header;
