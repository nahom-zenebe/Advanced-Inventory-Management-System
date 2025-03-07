import React from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';

function ManagerDashboard() {
  return (
    <div className="flex bg-base-100 bg-gray-200 min-h-screen">
    
      <Sidebar />


      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
}

export default ManagerDashboard;
