import React from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';
function AdminDashboard() {
  return (
    <div className="flex bg-base-100 bg-gray-200 min-h-screen">
      <Sidebar className="fixed top-0 left-0 h-full" />
      
      <div className="flex-1 ml-64"> 
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard



