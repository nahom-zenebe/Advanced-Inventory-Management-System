import React from 'react';
import { AiOutlineProduct } from "react-icons/ai";
import { RiStockLine } from "react-icons/ri";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { MdOutlineInventory2, MdPointOfSale, MdOutlineCategory } from "react-icons/md";
import { TfiSupport } from "react-icons/tfi";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxActivityLog, RxDashboard } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {logout  } from "../features/authSlice";
import toast from 'react-hot-toast';
import { LuUsers } from "react-icons/lu";


function Sidebar() {

  const dispatch = useDispatch();
  const navigator=useNavigate();



  const handleLogout=async()=>{

    dispatch(logout())
    .then(()=>{
      toast.success("logout successfully")
      navigator('/')
    })
    .catch((error)=>{
      toast.error("error in logout")
    })

  }




  return (
    <div className="flex flex-col bg-base-100 w-64 bg-gray-100 text-black min-h-screen p-6 shadow-lg ">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-10">Company Logo</h1>
      
      <nav className="space-y-4">
        <div className="text-lg mt-10 flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
          <RxDashboard className="text-xl" />
          <Link to="/ManagerDashboard">Dashboard</Link>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
            <AiOutlineProduct className="text-xl" />
            <Link to="/ManagerDashboard/product">Product</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
            <RxActivityLog className="text-xl" />
            <Link to="/ManagerDashboard/activity-log">Activity Log</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
            <TfiSupport className="text-xl" />
            <Link to="/ManagerDashboard/supplier">Supplier</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
            <MdPointOfSale className="text-xl" />
            <Link to="/ManagerDashboard/sales">Sales</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
            <FiShoppingCart className="text-xl" />
            <Link to="/ManagerDashboard/order">Order</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
            <RiStockLine className="text-xl" />
            <Link to="/ManagerDashboard/stock-transaction">Stock Transaction</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
            <IoNotificationsOutline className="text-xl" />
            <Link to="/ManagerDashboard/notifications">Notifications</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
            <MdOutlineInventory2 className="text-xl" />
            <Link to="/ManagerDashboard/inventory">Inventory</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
            <MdOutlineCategory className="text-xl" />
            <Link to="/ManagerDashboard/category">Category</Link>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
          <LuUsers  className="text-xl"/>
            <Link to="/ManagerDashboard/Userstatus">Users</Link>
          </li>

        
        </ul>
      </nav>

      <div className="mt-auto border-t pt-4">
        <div className="flex items-center space-x-3 text-lg text-gray-700 hover:text-red-600 cursor-pointer p-2 rounded-md transition">
          <FiLogOut className="text-xl" />
          <span onClick={handleLogout}>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
