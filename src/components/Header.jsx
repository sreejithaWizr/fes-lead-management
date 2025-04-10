
import React from 'react';
import { Search, RefreshCw, Filter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserProf from "../assets/user-image.svg";
import FilterIcon from "../assets/filter.svg";
import MenuIcon from "../assets/menu.svg";
import LeftArrowIcon from "../assets/arrow-left.svg";
import RightArrowIcon from "../assets/arrow-right.svg";
import { CustomButton } from "react-mui-tailwind";
import { formRef } from './forms/leadCreation';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLeadsPage = location.pathname === '/leads';
  const isCreateLeadPage = location.pathname === '/leads/create';

  const handleCreateLead = () => {
    navigate('/leads/create');
  };

  const handleCancel = () => {
    // navigate('/leads');
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

  return (
    <header className="w-full bg-white shadow-card">
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

            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-[300px] h-10 pl-10 pr-4 rounded-full border border-[#E0E0E0] text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#757575]" size={18} />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary">
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-medium">Kochi Leads</h2>
              <span className="bg-primary text-white px-2 py-0.5 rounded-md text-xs font-medium">8,467</span>
            </div>

            <div className="flex items-center gap-3 w-[405px]">
              <CustomButton text="Create Lead" endIcon={false} onClick={handleCreateLead} />
              <CustomButton text="Bulk Upload" variant="secondary" endIcon={false} />
              <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={FilterIcon} />
              <CustomButton variant="icon" showText={false} startIcon={false} endIcon={true} iconImg={MenuIcon} />
            </div>
          </div>
        </div>
      )}

      {isCreateLeadPage && (
        <div className="py-6 px-6 flex items-center justify-between">
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
    </header>
  );
};

export default Header;
