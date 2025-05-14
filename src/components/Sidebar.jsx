import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FESLOGO from "../assets/fes-logo.svg";
import DashboardIcon from "../assets/dashboard.svg";
import LeadIcon from "../assets/lead-icon.svg";
import BriefCase from "../assets/briefcase.svg";
import Box from "../assets/box.svg";
import SettingIcon from "../assets/setting.svg";
import NotificationIcon from "../assets/notification-icon.svg";
import ProfileIcon from "../assets/image-icon.svg";
import UserProfileMenu from '../pages/UserProfileMenu';
import NotificationMenu from '../pages/Notifcations/NotificationMenu';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const sidebarItems = [
    { icon: DashboardIcon, path: '/', name: 'Dashboard' },
    { icon: LeadIcon, path: '/leads', name: 'Leads' },
    { icon: BriefCase, path: '/products', name: 'Products' },
    { icon: Box, path: '/activities', name: 'Activities' },
    { icon: SettingIcon, path: '/settings', name: 'Settings' },
  ];

  const bottomItems = [
    {
      icon: NotificationIcon,
      path: '#',
      name: 'Notification',
      onClick: () => setActiveItem('Notification'),
    },
    {
      icon: ProfileIcon,
      path: '#',
      name: 'Profile',
      onClick: () => setActiveItem('Profile'),
    },
  ];

  return (
    <div className="w-[104px] h-screen bg-white flex flex-col items-center p-6 gap-6 border-r border-[#E0E0E0] fixed">
      <div className="mb-6">
        <img src={FESLOGO} alt="FES Logo" className="w-14 h-8 rounded-md" />
      </div>

      <div className="flex flex-col flex-start gap-4">
        {sidebarItems.map((item) => {
          const isActive = activeItem === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-center w-12 h-12 p-3 rounded-xl transition-colors duration-300 ${
                isActive ? 'bg-[#009CDC] text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
              title={item.name}
              onClick={() => setActiveItem(item.path)}
            >
              <img
                src={item.icon}
                alt={item.name}
                className={`w-6 h-6 transition-all duration-300 ${
                  isActive ? 'brightness-200 contrast-200' : ''
                }`}
              />
            </Link>
          );
        })}
      </div>

      {/* Bottom Items */}
      <div className="mt-auto flex flex-col flex-end gap-2 items-center">
        {bottomItems.map((item) => {
          const isActive = activeItem === item.name;

          return (
            <button
              key={item.name}
              onClick={item.onClick}
              className={`flex items-center justify-center w-12 h-12 p-3 rounded-xl transition-colors duration-300 ${
                isActive ? 'bg-[#009CDC] text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
              title={item.name}
            >
              <img
                src={item.icon}
                alt={item.name}
                className={`w-6 h-6 transition-all duration-300 ${
                  isActive ? 'brightness-200 contrast-200' : ''
                }`}
              />
            </button>
          );
        })}

        {/* Conditional Rendering for Menus */}
        {activeItem === 'Notification' && (
          <NotificationMenu onClose={() => setActiveItem(null)} />
        )}
        {activeItem === 'Profile' && (
          <UserProfileMenu onClose={() => setActiveItem(null)} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
