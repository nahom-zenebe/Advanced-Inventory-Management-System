import React, { useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import Navbar from '../Components/Navbar';
import Footer from "../Components/Footer"
import { Link } from 'react-router-dom';

function HomePage() {
  const [arrowShow, setArrowShow] = useState(false);

  const handleButtonHover = () => {
    setArrowShow(true);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-white to-gray-200 text-white overflow-hidden'>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        
        <div className="absolute inset-0 opacity-20 animate-gradient">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-yellow-500/10"></div>
        </div>

    
        <div className="text-center max-w-2xl relative z-10 mt-10">
          <h1 className='text-xl text-blue-800 mb-10 animate-pulse'>✧ Modern and Scalable</h1>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Comprehensive Inventory Management Tools
          </h1>
          <p className="text-xl text-gray-900 mb-8">
            Experience the perfect blend of power and simplicity. Connect your data, teams, and customers with our AI-driven CRM platform that scales with your business.
          </p>

        
          <div className="flex space-x-4 justify-center mb-12">
            <button
              onMouseEnter={handleButtonHover}
              className="group flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              <Link to='/SignupPage'>Get Started</Link>
              <FaArrowRightLong
                className={`ml-2 mt-1 transition-all duration-300 ${arrowShow ? "opacity-100 translate-x-2" : "opacity-0"} group-hover:opacity-100 group-hover:translate-x-2`}
              />
            </button>

            <button
              onMouseEnter={handleButtonHover}
              className="group flex items-center bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-3 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              View Demos
              <FaArrowRightLong
                className={`ml-2 mt-1 transition-all duration-300 ${arrowShow ? "opacity-100 translate-x-2" : "opacity-0"} group-hover:opacity-100 group-hover:translate-x-2`}
              />
            </button>
          </div>

          {/* Divider */}
          <hr className='border-t-2 border-gray-700 mb-10' />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { value: "+84%", label: "higer Effiecny " },
              { value: "99%", label: "Customer satisfaction score" },
              { value: "24/7", label: "work time" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg text-center border border-gray-700/50 hover:border-blue-400 transition-all duration-300 hover:scale-105"
              >
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {stat.value}
                </p>
                <p className="text-lg text-gray-300 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

         
         
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default HomePage;