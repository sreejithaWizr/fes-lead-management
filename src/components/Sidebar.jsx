
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, User, Package, Activity, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const sidebarItems = [
    { icon: BarChart3, path: '/', name: 'Dashboard' },
    { icon: User, path: '/leads', name: 'Leads' },
    { icon: Package, path: '/products', name: 'Products' },
    { icon: Activity, path: '/activities', name: 'Activities' },
    { icon: Settings, path: '/settings', name: 'Settings' },
  ];

  return (
    <div className="w-[104px] h-screen bg-white flex flex-col items-center p-6 gap-6 border-r border-[#E0E0E0] fixed">
      <div className="mb-6">
        <img 
          src="/lovable-uploads/2fa973f3-5336-4eec-a0b2-67687fc62b0e.png" 
          alt="FES Logo" 
          className="w-14 h-8 rounded-md" 
        />
      </div>
      
      <div className="flex flex-col gap-4">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path === '/leads' && location.pathname.includes('/lead'));
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`sidebar-icon group ${isActive ? 'active' : ''}`}
              title={item.name}
            >
              <item.icon size={24} />
            </Link>
          );
        })}
      </div>
      
      <div className="mt-auto">
        <button className="sidebar-icon group text-red-500 hover:text-red-600" title="Logout">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
