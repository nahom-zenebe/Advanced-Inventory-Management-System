import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Gettopproduct from "../lib/Gettopproduct";
import TopNavbar from "../Components/TopNavbar";
import { LuUsers } from "react-icons/lu";

function Dashboardpage() {
  const { staffuser, manageruser, adminuser } = useSelector((state) => state.auth);




  return (
    <>
          <TopNavbar/>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">

      <h1 className="text-3xl font-semibold  mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center w-56 h-56">
          <LuUsers className="text-5xl text-blue-500 mb-4" />
          <p className="text-xl font-bold text-gray-700">{staffuser?.length || 0}</p>
          <p className="text-gray-500">Staff Users</p>
        </div>

      
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center w-56 h-56">
          <LuUsers className="text-5xl text-green-500 mb-4" />
          <p className="text-xl font-bold text-gray-700">{manageruser?.length || 0}</p>
          <p className="text-gray-500">Managers</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center w-56 h-56">
          <LuUsers className="text-5xl text-red-500 mb-4" />
          <p className="text-xl font-bold text-gray-700">{adminuser?.length || 0}</p>
          <p className="text-gray-500">Admins</p>
        </div>
      </div>
      <Gettopproduct className="mt-20"/>
    </div>
    </>
  );
}

export default Dashboardpage;
