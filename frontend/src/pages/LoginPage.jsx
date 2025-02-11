import React from 'react';
import { Link } from 'react-router-dom';
function LoginPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">


      <div className="w-full sm:w-1/2 p-6 flex items-center justify-center bg-white shadow-lg rounded-xl">
        <div className="max-w-md w-full">
    
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">InventoryPro</h1>
            <p className="text-gray-600">by TechSolutions Inc.</p>
          </div>

        
          <form>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>


            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="2fa"
                className="mr-2"
              />
              <label htmlFor="2fa" className="text-gray-600 text-sm">Agree on term and conditions</label>
            </div>

            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
            Sign in 
            </button>
          </form>


          <div className="text-center mt-6">
            <a href="#" >Doesn't have an Account?<Link to='/SignupPage' className="text-blue-600 text-sm hover:underline">Click here</Link></a>
          </div>
        </div>
      </div>


      <div className="w-full sm:w-1/2 p-10 bg-blue-600 text-white flex flex-col justify-center rounded-r-xl">
        <h2 className="text-2xl font-bold mb-4">Efficient Inventory Management</h2>
        <p className="mb-6">Streamline your operations with real-time tracking, automated reports, and seamless integrations.</p>
        <div className="bg-white p-6 rounded-md text-gray-900">
          <p className="text-lg font-semibold">Dashboard Preview</p>
          <p className="text-sm text-gray-700">Monitor stock levels, generate insights, and optimize workflows.</p>
        </div>
      </div>

    </div>
  );
}

export default LoginPage;
