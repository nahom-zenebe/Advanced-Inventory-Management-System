import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-2xl font-semibold">InventoryPro</h2>
          <p className="text-gray-300 mt-2">Efficient Inventory Management, Simplified.</p>
          <p className="text-sm text-gray-400 mt-4">© {new Date().getFullYear()} InventoryPro. All rights reserved.</p>
        </div>

     
        <div>
          <h3 className="text-lg font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white">Dashboard</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Products</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Reports</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Settings</a></li>
          </ul>
        </div>


        <div>
          <h3 className="text-lg font-medium mb-3">Contact Us</h3>
          <p className="text-gray-300">Email: support@inventorypro.com</p>
          <p className="text-gray-300">Phone: 022-338-983-902</p>
          <p className="text-gray-300">Address: 123 Inventory St, Tech City</p>

   
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-300 hover:text-white text-xl"><FaFacebook /></a>
            <a href="#" className="text-gray-300 hover:text-white text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-300 hover:text-white text-xl"><FaLinkedin /></a>
            <a href="#" className="text-gray-300 hover:text-white text-xl"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
