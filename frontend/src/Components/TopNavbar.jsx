import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";

function TopNavbar() {
  return (
    <div>
        <nav className='bg-gray-800 w-full h-16 '>

       <div className='flex justify-between'>
        <h1>Welcome</h1>
        <FaRegCircleUser className='text-white text-3xl mr-40 mt-4' /></div>
            </nav>
    </div>
  )
}

export default TopNavbar