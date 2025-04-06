import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoMdAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import image from "../images/user.png";
import { createNotification, getAllNotifications, deleteNotification } from "../features/notificationSlice"; 
import { io } from "socket.io-client";
import toast from 'react-hot-toast';
import FormattedTime from "../lib/FormattedTime ";

function NotificationPage() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  const { Authuser } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://advanced-inventory-management-system-v1.onrender.com", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);

    dispatch(getAllNotifications());

    newSocket.on("newNotification", (newNotification) => {
   
      toast.custom((t) => (
        <div className={`flex items-center p-4 rounded-lg shadow-lg bg-white text-gray-800 ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <img 
            src={Authuser?.ProfilePic || image} 
            alt="Notification" 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-medium">{newNotification.name}</p>
            <p className="text-sm text-gray-600">{newNotification.type}</p>
          </div>
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
      ), {
        duration: 4000,
        position: 'top-right',
      });
      dispatch(getAllNotifications());
    });

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch, Authuser?.ProfilePic]);

  const resetForm = () => {
    setName("");
    setType("");
  };

  const submitNotification = async (event) => {
    event.preventDefault();
    const NotificationData = { name, type };

    dispatch(createNotification(NotificationData))
      .then(() => {
        toast.success("Notification added successfully");
        resetForm();
        setIsFormVisible(false);
      })
      .catch(() => {
        toast.error("Failed to add notification");
      });
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <TopNavbar />

      <div className="max-w-3xl bg-base-100 mx-auto mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
          >
            <IoMdAdd className="text-xl mr-2" /> Add Notification
          </button>
        </div>

        {isFormVisible && (
          <div className="p-6 rounded-lg bg-base-100 shadow-md mb-6">
            <div className="flex bg-base-100 justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Notification</h2>
              <MdClose 
                className="text-2xl cursor-pointer" 
                onClick={() => setIsFormVisible(false)} 
              />
            </div>
            <form onSubmit={submitNotification}>
              <div className="mb-4">
                <label className="block font-medium">Title</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full h-10 px-3 border rounded-lg mt-2"
                  placeholder="Enter title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Description</label>
                <textarea
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full h-24 px-3 border rounded-lg mt-2"
                  placeholder="Enter description"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white w-full h-12 rounded-lg hover:bg-blue-700 transition"
              >
                Add Notification
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4 bg-base-100">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification._id} className="flex items-center bg-base-300 p-4 rounded-lg shadow-md hover:bg-base-200 transition">
                <img 
                  src={Authuser?.ProfilePic || image} 
                  alt="User" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{notification.name}</h3>
                  <p className="text-sm text-gray-600">{notification.type}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    <FormattedTime timestamp={notification.createdAt}/>
                  </p>
                </div>
                <button
                  onClick={() => dispatch(deleteNotification(notification._id))}
                  className="text-red-600 hover:text-red-800 transition p-2"
                  aria-label="Delete notification"
                >
                  <MdClose className="text-2xl" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center bg-base-100 text-gray-600 py-4">No notifications found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;