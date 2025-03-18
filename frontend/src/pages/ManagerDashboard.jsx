import React from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';

function ManagerDashboard() {
  return (
    <div className="flex bg-gray-200 min-h-screen">

      <div className="fixed h-full">
        <Sidebar />
      </div>

     
      <div className="flex-1 pl-64"> 
        <Outlet />
      </div>
    </div>
  );
}

export default ManagerDashboard;