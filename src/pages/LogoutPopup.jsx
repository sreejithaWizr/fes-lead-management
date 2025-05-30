import React from 'react';
import {useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import {CustomButton} from 'react-mui-tailwind'; // Adjust the import path as needed
import { createPortal } from 'react-dom';

const LogoutPopup = ({ onClose }) => {
    const navigate = useNavigate(); // <-- for redirecting


const handleConfirmLogout = () => {
    logout(); // Use centralized logout function
    navigate('/login', { replace: true }); // Redirect to login page
    onClose(); // Close the logout modal or UI component
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div
        className="bg-white rounded-3xl p-[34px] flex flex-col items-center gap-[24px]"
        style={{ width: 'auto', height: 'auto' }}
      >
        <p className="text-center text-neutral-500 text-[16px] font-medium">
          Are you sure you want to logout?
        </p>
        <div className="flex gap-[8px]">
          <CustomButton
            text="Yes, Logout"
            startIcon={false}
            endIcon={false}
            width="auto"
            // height="40px"
            onClick={handleConfirmLogout}
          />
          <CustomButton
            text="Cancel"
            variant="secondary"
            startIcon={false}
            endIcon={false}
            width="auto"
            // height="40px"
            onClick={onClose}
          />
        </div>
      </div>
    </div>,
    document.body // Render directly to the body
  );
};

export default LogoutPopup;