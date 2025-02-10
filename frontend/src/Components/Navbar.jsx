import React from 'react';

function Navbar() {
  return (
    <div className="bg-gray-800">
      <nav className="flex justify-between items-center py-4 px-10">
        <h1 className="text-white text-3xl font-semibold tracking-wide">INventory</h1>
        <ul className="flex space-x-12">
          <li className="text-white font-medium text-lg hover:text-blue-400 transition duration-300">Home</li>
          <li className="text-white font-medium text-lg hover:text-blue-400 transition duration-300">About</li>
          <li className="text-white font-medium text-lg hover:text-blue-400 transition duration-300">Service</li>
        </ul>
        <div>
          <button className="text-white px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 mr-4">Get Started</button>
          <button className="text-blue-600 px-6 py-2 bg-white rounded-lg hover:bg-gray-100 focus:outline-none transition duration-300">Sign Up</button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
