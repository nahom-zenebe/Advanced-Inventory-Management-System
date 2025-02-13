import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";

function TopNavbar() {
  return (
    <div>
      <nav className='bg-white shadow-md w-full h-16 flex items-center justify-between px-6'>
        <h1 className='text-xl font-semibold text-gray-800'>Welcome</h1>

        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-4'>
            <FaRegCircleUser className='text-gray-600 text-3xl' />
            <div className='text-left'>
              <h1 className='text-gray-800 font-medium'>Abebe Tesmea</h1>
              <p className='text-gray-500 text-sm'>Manager</p>
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