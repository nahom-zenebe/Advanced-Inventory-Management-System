import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { createNotification,getAllNotifications,deleteNotification } from "../features/notificationSlice";
import toast from "react-hot-toast";


function Notificationpage() {
  const dispatch = useDispatch();
  const {  notifications  } = useSelector(
    (state) => state.notification
  );

  const[name,setname]=useState("")
  const[type,settype]=useState("")
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);




  const resetForm = () => {
    setname("");
    settype("");
   
  };

  const submitNotification = async (event) => {
    event.preventDefault();
    const NotificationData = { name, type };

    dispatch(createNotification( NotificationData))
      .unwrap()
      .then(() => {
        toast.success("Notification added successfully");
        resetForm();
      })
      .catch(() => {
        toast.error("Notification add unsuccessful");
      });
  };



  return (
    <div>
  <TopNavbar />



  <div>




  <button   onClick={() => {
              setIsFormVisible(true);
          
            }} className="bg-blue-800 text-white w-40 h-12 rounded-lg flex items-center justify-center">
            <IoMdAdd className="text-xl mr-2" /> Add Notification
          </button>



      

{isFormVisible && (
  <div className="absolute top-10 bg-gray-100 right-0 h-svh p-6 border-2 border-gray-300 rounded-lg shadow-md transition-transform transform">
    <div className="text-right">
      <MdKeyboardDoubleArrowLeft
        onClick={() => setIsFormVisible(false)}
        className="cursor-pointer text-2xl"
      />
    </div>

    <h1 className="text-xl font-semibold mb-4">
      {selectedProduct ? "Edit Product" : "Add Product"}
    </h1>

    <form onSubmit={ submitNotification}>
      <div className="mb-4">
        <label>Name</label>
        <input
          value={name}
          placeholder="Enter product name"
          onChange={(e) => setname(e.target.value)}
          type="text"
          className="w-full h-10 px-2 border-2 rounded-lg mt-2"
        />
      </div>

      

      <div className="mb-4">
        <label>Type</label>
        <textarea
          value={type}
          placeholder="Enter the type"
          onChange={(e) => settype(e.target.value)}
          type="text"
          className="w-full h-24 px-2 border-2 rounded-lg mt-2"
        />
      </div>

      

      <button
        type="submit"
        className="bg-blue-800 text-white w-full h-12 rounded-lg hover:bg-blue-700 mt-4"
      >
        {selectedProduct ? "Update Product" : "Add Notification"}
      </button>
    </form>
  </div>
)}




  </div>

      </div>
  )
}

export default Notificationpage