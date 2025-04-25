import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import FESLOGO from "../assets/fes-logo.svg";
import DashboardIcon from "../assets/dashboard.svg";
import LeadIcon from "../assets/lead-icon.svg";
import BriefCase from "../assets/briefcase.svg";
import Box from "../assets/box.svg";
import SettingIcon from "../assets/setting.svg";
import NotificationIcon from "../assets/notification-icon.svg"
import ProfileIcon from "../assets/image-icon.svg"
import UserProfileMenu from '../pages/UserProfileMenu';



const Sidebar = () => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false); // For profile menu
  const sidebarItems = [
    { icon: DashboardIcon, path: '/', name: 'Dashboard' },
    { icon: LeadIcon, path: '/leads', name: 'Leads' },
    { icon: BriefCase, path: '/products', name: 'Products' },
    { icon: Box, path: '/activities', name: 'Activities' },
    { icon: SettingIcon, path: '/settings', name: 'Settings' },
  ];

  const bottomItems = [
    { icon: NotificationIcon, path: '#', name: 'Notification' },
    { icon: ProfileIcon, path: '#', name: 'Profile',
      onClick: () => setIsProfileOpen((prev) => !prev),

     },
  ];


  return (
    <div className="w-[104px] h-screen bg-white flex flex-col items-center p-6 gap-6 border-r border-[#E0E0E0] fixed">
      <div className="mb-6">
        <img src={FESLOGO} alt="FES Logo" className="w-14 h-8 rounded-md" />
      </div>

      <div className="flex flex-col flex-start gap-4">
        {sidebarItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/leads" && location.pathname.includes("/lead"));

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-center w-12 h-12 p-3 rounded-xl transition-colors duration-300 ${isActive ? "bg-[#009CDC] text-white" : "text-gray-500 hover:text-gray-700"
                }`}
              title={item.name}
            >
              {/* Render SVG */}
              <img
                src={item.icon}
                alt={item.name}
                className={`w-6 h-6 transition-all duration-300 ${isActive ? "brightness-200 contrast-200" : "text-gray-500"
                  }`}
              />
            </Link>
          );
        })}
      </div>

{/* Push bottom items and logout to end */}
<div className="mt-auto flex flex-col flex-end gap-2 items-center">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-center w-12 h-12 p-3 rounded-xl transition-colors duration-300 ${
                isActive ? "bg-[#009CDC] text-white" : "text-gray-500 hover:text-gray-700"
              }`}
              title={item.name}
            >
              <img
                src={item.icon}
                alt={item.name}
                onClick={item.onClick}
                className={`w-6 h-6 transition-all duration-300 ${
                  isActive ? "brightness-200 contrast-200" : ""
                }`}
              />
            </Link>
          );
        })}
        {isProfileOpen && <UserProfileMenu onClose={() => setIsProfileOpen(false)} />}

        </div>

      {/* <div className="mt-auto">
        <button className="sidebar-icon group text-red-500 hover:text-red-600" title="Logout" onClick={handleLogoutClick}>
          <img src={LogoutIcon} alt="Logout" className="w-6 h-6" />
        </button>
        {isPopupOpen && <LogoutPopup onClose={handleClosePopup} />}
      </div> */}
    </div>
  );
};

export default Sidebar;
