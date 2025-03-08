import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Gettopproduct from "../lib/Gettopproduct";
import TopNavbar from "../Components/TopNavbar";
import { LuUsers } from "react-icons/lu";

function Dashboardpage() {
  const { staffuser, manageruser, adminuser } = useSelector((state) => state.auth);




  return (
    <div className="bg-base-100">
          <TopNavbar/>
    <div className="min-h-screen bg-base-100  flex flex-col items-center p-10">

      <h1 className="text-3xl font-semibold bg-base-100  mb-6">Dashboard</h1>

      <div className="grid bg-base-100 grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      
        <div className=" bg-base-100 shadow-lg rounded-xl p-6 flex  flex-col items-center w-56 h-56">
          <LuUsers className="text-5xl text-blue-500 mb-4" />
          <p className="text-xl font-bold text-gray-700 bg-base-100">{staffuser?.length || 0}</p>
          <p className="text-gray-500 bg-base-100">Staff Users</p>
        </div>

      
        <div className="shadow-lg bg-base-100 rounded-xl p-6 flex flex-col items-center w-56 h-56">
          <LuUsers className="text-5xl text-green-500 mb-4" />
          <p className="text-xl font-bold text-gray-700 bg-base-100">{manageruser?.length || 0}</p>
          <p className="text-gray-500 bg-base-100">Managers</p>
        </div>

        <div className="bg-base-100 shadow-lg rounded-xl p-6 flex flex-col items-center w-56 h-56">
          <LuUsers className="text-5xl bg-base-100 text-red-500 mb-4" />
          <p className="text-xl font-bold text-gray-700">{adminuser?.length || 0}</p>
          <p className="text-gray-500">Admins</p>
        </div>
      </div>
      <Gettopproduct className="mt-20 bg-base-100"/>
    </div>
    </div>
  );
}

export default Dashboardpage;
