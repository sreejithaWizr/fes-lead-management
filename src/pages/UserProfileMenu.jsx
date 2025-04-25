import React, { useState,useEffect,  useRef } from "react";
import { Link } from "react-router-dom";
import { createPortal } from 'react-dom';
import ProfileIcon from "../assets/image-icon.svg";
import ViewProfileIcon from "../assets/view-profile.svg";
import LogoutIcon from "../assets/logout.svg";
import LogoutPopup from './LogoutPopup'; // Adjust the import path as needed


const UserProfileMenu = ({ onClose }) => { 
       const menuRef = useRef(null); // Ref to track the popup container
      const [isPopupOpen, setIsPopupOpen] = useState(false);

      const handleLogoutClick = () => {
        setIsPopupOpen(true);
      };
      
      const handleClosePopup = () => {
        setIsPopupOpen(false);
      };
      // Handle clicks outside the popup
  const handleBackdropClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      onClose(); // Close the popup
    }
  };
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-20 z-50" // Full-screen backdrop
      onClick={handleBackdropClick} // Attach click handler to backdrop
    >
    <div 
      className="absolute left-[75px] bottom-[35px] mt-2 w-[252px] h-[auto] bg-white shadow-lg rounded-[12px] p-8 flex flex-col gap-4 border border-gray-200 z-50"
      ref={menuRef}
    >
      {/* Profile Image and Name */}
      <div className="flex items-center gap-3">
        <img src={ProfileIcon} alt="Profile" className="w-10 h-10 rounded-full" />
        <span className="text-gray-700 font-medium">Aravinth Raj J</span>
      </div>

      <hr className="border-gray-300" />

      {/* View Profile */}
      <Link 
        to="/profile" 
        className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition"
        onClick={onClose}
      >
        <img src={ViewProfileIcon} alt="View Profile" className="w-5 h-5" />
        <span>View Profile</span>
      </Link>

      {/* Logout */}
      <button 
        className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition"
        onClick={handleLogoutClick} // Replace with actual logout function
      >
        <img src={LogoutIcon} alt="Logout" className="w-5 h-5" />
        <span>Logout</span>
      </button>
      {isPopupOpen && <LogoutPopup onClose={handleClosePopup} />}
      </div>
    </div>,
     document.body // Render directly to the body
  );
};

export default UserProfileMenu;
