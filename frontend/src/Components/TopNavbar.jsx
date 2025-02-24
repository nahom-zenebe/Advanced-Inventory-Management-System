import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import {  useSelector } from "react-redux";
import { Link } from 'react-router-dom';
function TopNavbar() {
  const { Authuser, isUserSignup } = useSelector((state) => state.auth);




  return (
    <div>
      <nav className='bg-white shadow-md w-full h-16 flex items-center justify-between px-6'>
        <h1 className='text-xl font-semibold text-gray-800'>Welcome</h1>

        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-4'>
       <Link to='/ManagerDashboard/Profilepage'>    <FaRegCircleUser  className='text-gray-600 text-3xl' /></Link> 
            <div className='text-left'>
              <h1 className='text-gray-800 font-medium'>{Authuser?.savedUser?.name ||  "Guest"}</h1>
              <p className='text-gray-500 text-sm'>{Authuser?.savedUser?.role || "Visitor"}</p>
            </div>
          </div>
          <HiDotsVertical className='text-gray-600 text-xl cursor-pointer' />
        </div>
      </nav>
      <hr className='border-gray-200' />
    </div>
  );
}

export default TopNavbar;