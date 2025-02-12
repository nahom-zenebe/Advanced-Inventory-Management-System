import React from 'react';
import { AiOutlineProduct } from "react-icons/ai";
import { RiStockLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineInventory2, MdPointOfSale, MdOutlineCategory } from "react-icons/md";
import { TfiSupport } from "react-icons/tfi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RxActivityLog, RxDashboard } from "react-icons/rx";

function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white min-h-screen p-5">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Logo of Company</h1>
      
      <div className="flex flex-col space-y-4">
     
        <h1 className="text-xl text-gray-300 flex items-center space-x-2 hover:text-gray-100 cursor-pointer">
          <RxDashboard />
          <span>Dashboard</span>
        </h1>

   
        <ul className="space-y-2">
          <li className="text-lg flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <AiOutlineProduct />
            <span>Product</span>
          </li>
          <li className="text-lg flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <RxActivityLog />
            <span>Activity</span>
          </li>
          <li className="text-lg flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <TfiSupport />
            <span>Supplier</span>
          </li>
          <li className="text-lg flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <MdPointOfSale />
            <span>Sales</span>
          </li>
          <li className="text-lg flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <FiShoppingCart />
            <span>Order</span>
          </li>
          <li className="text-lg flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <RiStockLine />
            <span>Stock Transaction</span>
          </li>
          <li className="text-lg flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <IoNotificationsOutline />
            <span>Notification</span>
          </li>
          <li className="text-lg flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <MdOutlineInventory2 />
            <span>Inventory</span>
          </li>
          <li className="text-lg flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
            <MdOutlineCategory />
            <span>Category</span>
          </li>
        </ul>

 
        <div className="mt-auto flex items-center space-x-2 text-lg text-red-400 hover:text-white cursor-pointer">
          <FiLogOut />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
