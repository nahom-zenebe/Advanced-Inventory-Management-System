import React, { useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
function HomePage() {
  const[arrowshow, setArrowShow] = useState(false);

  const handlebtn1 = () => {
    setArrowShow(true);
  };

  const handlebtn2 = () => {
    setArrowShow(true);
  };

  return (
    <>
    
    <Navbar/>
  
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute inset-0 bg-white opacity-20" style={{
        backgroundImage: "linear-gradient(45deg, rgba(0,0,0,0.1) 80%, transparent 25%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 75%, transparent 75%, transparent)",
        backgroundSize: "40px 40px"
      }}></div>
      
      <div className="text-center text-gray-900 max-w-2xl relative z-10">
        <h1 className="text-5xl font-bold mb-6">
          Comprehensive CRM Tools for Your Team
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Experience the perfect blend of power and simplicity. Connect your data, teams, and customers with our AI-driven CRM platform that scales with your business.
        </p>

        <div className="bg-gray-300 p-6 rounded-lg mb-8">
          <p className="text-2xl font-semibold text-gray-900">
            $770.00 deal for Acme Inc.
          </p>
          <p className="text-lg text-gray-800">
            Clover date: Jan 6, 2024
          </p>
        </div>

        <div className="flex space-x-4 justify-center mb-12">
          <button 
            onClick={handlebtn1} 
            className="group flex bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
          >
            <Link to='/SignupPage'>Get Started</Link>
            <FaArrowRightLong 
              className={`ml-2 mt-1 transition-opacity duration-300 ${arrowshow ? "opacity-100" : "opacity-0"} group-hover:opacity-100`} 
            />
          </button>
          
          <button 
            onClick={handlebtn2} 
            className="group  flex bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition duration-300 font-semibold"
          >
            View Demos 
            <FaArrowRightLong 
              className={`ml-2 mt-1 transition-opacity duration-300 ${arrowshow ? "opacity-100" : "opacity-0"} group-hover:opacity-100`} 
            />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-300 p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">+24%</p>
            <p className="text-sm text-gray-700">Higher leads</p>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">99%</p>
            <p className="text-sm text-gray-700">Customer satisfaction score</p>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">4B+</p>
            <p className="text-sm text-gray-700">Daily API calls</p>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">35B</p>
            <p className="text-sm text-gray-700">Messages sent in 2023</p>
          </div>
        </div>

        <div className="flex space-x-6 justify-center">
          <span className="text-sm text-gray-500">descript</span>
          <span className="text-sm text-gray-500">hotjar</span>
          <span className="text-sm text-gray-500">Segment</span>
        </div>
      </div>
    </div>
    </>
  );
}

export default HomePage;
