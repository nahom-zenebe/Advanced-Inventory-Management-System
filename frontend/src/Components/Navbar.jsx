import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../images/logo1.png'
function Navbar() {
  return (
    <div className="bg-gray-800">
      <nav className="flex justify-between items-center py-4 px-10">
      
        <img src={logo1} className='w-56' alt="sample logo"></img>
        <div>
          <button className="text-white px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 mr-4">           <Link to='/SignupPage'>Get Started</Link></button>
          <button className="text-blue-600 px-6 py-2 bg-white rounded-lg hover:bg-gray-100 focus:outline-none transition duration-300">           <Link to='/SignupPage'>Sign up</Link></button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
