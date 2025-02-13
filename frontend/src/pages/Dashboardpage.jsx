import React from 'react';
import TopNavbar from '../Components/TopNavbar';

function Dashboardpage() {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <TopNavbar />
      <div className="max-w-7xl ml-10 mt-8">

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Inventory Dashboard</h1>
        <p className="text-gray-700 mb-8">
          Welcome to your Inventory Dashboard! Here, you can manage and track all your inventory items efficiently.
          You can add new items, update existing ones, and view detailed reports on your inventory status.
        </p>

  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Use the Dashboard</h2>
          <p className="text-gray-700 mb-4">
            This dashboard provides an overview of your inventory and allows you to perform the following actions:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>View Inventory:</strong> See a detailed list of all inventory items, including their quantities and status.</li>
            <li><strong>Add New Items:</strong> Add new products or items to your inventory with ease.</li>
            <li><strong>Update Stock:</strong> Modify the quantity or details of existing items.</li>
            <li><strong>Generate Reports:</strong> Create reports to analyze inventory performance, low stock items, and reorder needs.</li>
          </ul>
        </div>

      
        

      
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <p className="text-gray-700 mb-4">
            Use the navigation bar at the top to quickly access the following features:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Inventory List:</strong> View and manage all inventory items.</li>
            <li><strong>Add Item:</strong> Add a new item to your inventory.</li>
            <li><strong>Reports:</strong> Generate inventory reports for better insights.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboardpage;