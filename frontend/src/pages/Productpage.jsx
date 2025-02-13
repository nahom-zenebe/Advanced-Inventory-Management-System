import React from 'react';
import TopNavbar from '../Components/TopNavbar';
import { IoMdAdd } from "react-icons/io";

function Productpage() {
  return (
    <div>
      <TopNavbar />

      <div className="bg-white w-full h-32 flex items-center justify-center shadow-md">
        <h1 className="text-xl font-semibold">Welcome</h1>
      </div>

      <div className="mt-10 ml-5">
        <div className="flex items-center space-x-4">
          <input 
            type="text" 
            className="w-full md:w-96 h-12 pl-4 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"  
            placeholder="Enter your product"
          />
          <button className="bg-blue-800 flex items-center justify-center text-white w-40 h-12 rounded-lg hover:bg-blue-700 transition duration-200 px-4">
            <IoMdAdd className="text-xl mr-2" /> Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productpage;
