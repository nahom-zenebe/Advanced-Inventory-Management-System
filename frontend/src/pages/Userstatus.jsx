import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  staffUser,
  managerUser,
  adminUser
 
} from "../features/authSlice";
import toast from "react-hot-toast";





function Userstatus() {
  const {staffuser,manageruser,adminuser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(staffUser());
    dispatch(managerUser());
    dispatch(adminUser());
  }, [dispatch]);

  console.log(staffuser)
  console.log(adminuser)
  console.log(manageruser)


  return (
    <div className="min-h-screen bg-gray-100 ">
      <TopNavbar />
      <div className="max-w-7xl ml-10 mt-8">

      </div>
    </div>
  );
}

export default Userstatus;