
import React from 'react';
import { Search, RefreshCw, Filter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserProf from "../assets/user-image.svg";
import FilterIcon from "../assets/filter.svg";
import MenuIcon from "../assets/menu.svg";
import RefreshIcon from "../assets/refresh.svg";
import { CustomButton, CustomSearch } from "react-mui-tailwind"

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLeadsPage = location.pathname === '/leads';
  const isCreateLeadPage = location.pathname === '/leads/create';

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

  return (
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
              {/* <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-200 text-primary hover:bg-gray-100 transition">
                <RefreshCw size={20} className="text-blue-500" />
              </button> */}
              <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={RefreshIcon} />
            </div>

          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-medium">Kochi Leads</h2>
              <span className="bg-primary text-white px-2 py-0.5 rounded-md text-xs font-medium">8,467</span>
              {/* <CustomDropdown label="Value" options={["Option 1", "Option 2", "Option 3"]} required={true} initialValue="Option 2" //  Pre-selects "Option 2"
          /> */}
            </div>

            <div className="flex items-center gap-3 w-[405px]">
              {/* <button 
                className="btn-primary flex items-center gap-2"
                onClick={handleCreateLead}
              >
                <span>+ Create Lead</span>
              </button> */}
              <CustomButton text="Create Lead" endIcon={false} onClick={handleCreateLead} />
              {/* <button className="btn-secondary flex items-center gap-2">
                <span>Bulk Upload</span>
              </button> */}
              <CustomButton text="Bulk Upload" variant="secondary" endIcon={false} />
              {/* <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E0E0E0] text-[#757575]">
                <Filter size={18} />
              </button> */}
              <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={FilterIcon} />
              <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={MenuIcon} />
              {/* <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E0E0E0] text-[#757575]">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1H1V8H8V1Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 1H10V8H17V1Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 10H10V17H17V10Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 10H1V17H8V10Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button> */}
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
  );
};

export default Header;
