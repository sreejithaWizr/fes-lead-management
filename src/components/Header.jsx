
import React, { useState } from 'react';
import { Search, RefreshCw, Filter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserProf from "../assets/user-image.svg";
import FilterIcon from "../assets/filter.svg";
import MenuIcon from "../assets/menu.svg";
import RefreshIcon from "../assets/refresh.svg";
import { CustomButton, CustomSearch, CustomDropDown, CustomOffCanvasModal } from "react-mui-tailwind";
// import  CustomOffCanvasModal  from "./OffcanvasModal"
import FilterContent from '../pages/FilterContent';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLeadsPage = location.pathname === '/leads';
  const isCreateLeadPage = location.pathname === '/leads/create';

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
    navigate('/leads');
  };

  console.log("value", isFilterOpen)
  return (
    <>
      <header className="w-full shadow-card">
        {isLeadsPage && (
          <div className="py-6 px-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={UserProf}
                  alt="Profile"
                  className="w-[61px] h-[61px] rounded-[12px]"

                />
                <div>
                  <h2 className="text-sm font-normal text-[#757575]">Hello,</h2>
                  <h1 className="text-base font-medium">Deego Chaithanyan!</h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <CustomSearch />
                </div>
                <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={RefreshIcon} />
              </div>

            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* <h2 className="text-lg font-medium">Kochi Leads</h2>
              <span className="bg-primary text-white px-2 py-0.5 rounded-md text-xs font-medium">8,467</span> */}
                <CustomDropDown options={[
                  { name: "Kochi Leads", count: 8467 },
                  { name: "Mumbai Leads", count: 5321 },
                  { name: "Delhi Leads", count: 6789 }
                ]}
                  // required={true}
                  placeHolder="Select Branch"
                />
              </div>

              <div className="flex items-center gap-3 w-[405px]">
                <CustomButton text="Create Lead" endIcon={false} onClick={handleCreateLead} />
                <CustomButton text="Bulk Upload" variant="secondary" endIcon={false} />
                <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={FilterIcon} onClick={() => toggleFilter()} />
                <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={MenuIcon} />
              </div>
            </div>
          </div>
        )}

        {isCreateLeadPage && (
          <div className="py-6 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/lovable-uploads/2fa973f3-5336-4eec-a0b2-67687fc62b0e.png"
                alt="FES Logo"
                className="w-14 h-8 rounded-md"
              />
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-medium">Create a new lead</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="btn-primary flex items-center gap-2"
                onClick={handleSubmit}
              >
                <span>Submit</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33301 8H12.6663" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
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
