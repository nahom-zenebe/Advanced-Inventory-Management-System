import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import {  useSelector } from "react-redux";
import image from "../images/user.png";
import ThemeToggle from "../lib/ThemeToggle";
import { Link } from 'react-router-dom';
function TopNavbar() {
  const { Authuser, isUserSignup } = useSelector((state) => state.auth);




  return (
   
    <div className=' bg-base-100 '>
      <nav className='bg-gray-100 shadow-md w-full h-16 flex items-center justify-between px-6'>
        <h1 className='text-xl font-semibold text-gray-800'>Welcome, {Authuser?.name ||  "Guest"}</h1>

        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-4'>
       <Link to='/ManagerDashboard/Profilepage'>  
       <img
                className="border-4  border-blue-500 h-10 w-10 rounded-full object-cover shadow-lg"
                src={ Authuser?.ProfilePic || image}
                alt="Profile"
              /></Link> 
            <div className='text-left'>
              <h1 className='text-gray-800 font-medium'>{Authuser?.name ||  "Guest"}</h1>
              <p className='text-gray-500 text-sm'>{Authuser?.role || "Visitor"}</p>
            </div>
          </div>
          <ThemeToggle className='text-gray-600 text-xl cursor-pointer' />
         
        </div>
      </nav>
      <hr className='border-gray-200' />
    </div>

  );
}

export default TopNavbar;