
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex min-h-screen pb-8 bg-gradient-to-tr from-[#c5deec] via-[#F2FAFF] to-white">
      <Sidebar />
      <div className="ml-[104px] w-[calc(100%-104px)]">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
