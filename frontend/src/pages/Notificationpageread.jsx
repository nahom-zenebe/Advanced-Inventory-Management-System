import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../features/notificationSlice"; 
import { io } from "socket.io-client";
import FormattedTime from "../lib/FormattedTime ";
import image from "../images/user.png";
import TopNavbar from "../Components/TopNavbar";
function NotificationPageRead() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  const { Authuser } = useSelector((state) => state.auth);

  useEffect(() => {

    const socket = io("https://advanced-inventory-management-system-v1.onrender.com", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });


    dispatch(getAllNotifications());


    socket.on("newNotification", () => {
      dispatch(getAllNotifications());
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="bg-base-100 min-h-screen">
        <TopNavbar />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification._id} 
                className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <img 
                  src={Authuser?.ProfilePic || image} 
                  alt="User" 
                  className="w-10 h-10 rounded-full mr-4 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{notification.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.type}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    <FormattedTime timestamp={notification.createdAt}/>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No notifications available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationPageRead;