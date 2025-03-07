import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import image from "../images/user.png";
import {
  staffUser,
  managerUser,
  adminUser
} from "../features/authSlice";
import toast from "react-hot-toast";

function Userstatus() {
  const { staffuser, manageruser, adminuser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(staffUser());
    dispatch(managerUser());
    dispatch(adminUser());
  }, [dispatch]);

  console.log(staffuser);
  console.log(adminuser);
  console.log(manageruser);

  return (
    <div className="min-h-screen bg-base-100">
      <TopNavbar />
      <div className="bg-white bg-base-100 mt-10 ml-10 w-72 overflow-auto rounded-lg">
        <div className="bg-white bg-base-100 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg bg-base-100 font-semibold mb-2">Manager</h2>
          {manageruser?.length > 0 ? (
            manageruser.map((user, index) => (
              <div key={index} className="flex bg-base-100 items-center space-x-4 p-2 border-b">
                <img src={image} alt="User" className="w-10 bg-base-100 h-10 rounded-full" />
                <div className="bg-base-100">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 bg-base-100">No users available.</p>
          )}
        </div>

        <div className="bg-white bg-base-100 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg bg-base-100 font-semibold mb-2">Admin User</h2>
          {adminuser?.length > 0 ? (
            adminuser.map((user, index) => (
              <div key={index} className="flex bg-base-100 items-center space-x-4 p-2 border-b">
                <img src={image} alt="User" className="w-10 h-10 bg-base-100 rounded-full" />
                <div className="bg-base-100">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 bg-base-100">No users available.</p>
          )}
        </div>

        <div className="bg-white bg-base-100 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg bg-base-100 font-semibold mb-2">Staff User</h2>
          {staffuser?.length > 0 ? (
            staffuser.map((user, index) => (
              <div key={index} className="flex bg-base-100 items-center space-x-4 p-2 border-b">
                <img src={image} alt="User" className="w-10 h-10 rounded-full" />
                <div className="bg-base-100">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 bg-base-100">No users available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Userstatus;
