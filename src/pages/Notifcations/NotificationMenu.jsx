import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import {CustomButton} from 'react-mui-tailwind'; 
import Exit from '../../assets/Exit-icon.svg';
import NotificationList from "./NotificationList";


const NotificationMenu = ({ onClose }) => {
  const menuRef = useRef(null);
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Unread", "Read", "Lead Updates"];

  // Handle clicks outside the popup
  const handleBackdropClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      onClose();
    }
  };
  const handleCancel  =()=>{
    onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-20 z-50"
      onClick={handleBackdropClick}
       style={{ clipPath: 'inset(0 0 0 100px)' }} 
    >
      <div
        className="absolute left-[100px] w-[542px] h-screen bg-white shadow-lg rounded-tr-[12px] rounded-br-[12px] p-4 flex flex-col gap-4 border border-gray-200 z-50"
        ref={menuRef} 
      >
{/* Header with Title and Exit Icon */}
        <div className="pt-2 px-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1
              className="font-proxima font-bold text-[28px] leading-[140%] text-[#17222B]"
            >
              Notifications
            </h1>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCancel}
              className="w-[46px] h-[46px] flex items-center justify-center text-[#17222B] hover:bg-gray-200 rounded-xl transition-colors"
              role="button"
              aria-label="Close notifications"
            >
              <img
                src={Exit}
                alt="Close"
                className="w-10 h-10"
              />
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="pb-2">
          <div className="mb-2">
            <div className="flex items-center space-x-2">
              {tabs.map((tab) => (
                <React.Fragment key={tab}>
                  <CustomButton
                    text={tab}
                    variant="chips"
                    rounded="full"
                    startIcon={false}
                    endIcon={false}
                    onClick={() => setActiveTab(tab)}
                    selected={activeTab === tab}
                  />
                  {/* {tab === "Unread" && (
                    <div className="h-6 w-px bg-gray-300 mx-2" />
                  )} */}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        {/* Notification Content */}
        <div className="flex-1 overflow-y-auto">
          <NotificationList activeTab={activeTab} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NotificationMenu;