import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Gettopproduct from "../lib/Gettopproduct";
import TopNavbar from "../Components/TopNavbar";
import { LuUsers, LuClock, LuActivity } from "react-icons/lu"; // Icons for activity logs
import { getrecentActivityLogs } from "../features/activitySlice";
import FormattedTime from "../lib/FormattedTime ";
import { io } from "socket.io-client";

function Dashboardpage() {
  const { staffuser, manageruser, adminuser } = useSelector((state) => state.auth);
  const { recentuser } = useSelector((state) => state.activity);
  const dispatch = useDispatch();

  const socket = io("https://advanced-inventory-management-system-v1.onrender.com", {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });

  useEffect(() => {
    dispatch(getrecentActivityLogs());

    // Listen for new activity logs
    socket.on("newActivityLog", (newLog) => {
      console.log("New activity log:", newLog);
      // Optionally, update the UI or refetch logs
    });

    return () => {
      socket.off("newActivityLog"); // Clean up the listener
    };
  }, [dispatch, socket]);

  return (
    <div className="bg-base-100">
      <TopNavbar />
      <div className="min-h-screen flex flex-col items-center p-10">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

        {/* User Count Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center w-56 h-56 hover:shadow-xl transition-shadow">
            <LuUsers className="text-5xl text-blue-500 mb-4" />
            <p className="text-xl font-bold text-gray-700">{staffuser?.length || 0}</p>
            <p className="text-gray-500">Staff Users</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center w-56 h-56 hover:shadow-xl transition-shadow">
            <LuUsers className="text-5xl text-green-500 mb-4" />
            <p className="text-xl font-bold text-gray-700">{manageruser?.length || 0}</p>
            <p className="text-gray-500">Managers</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center w-56 h-56 hover:shadow-xl transition-shadow">
            <LuUsers className="text-5xl text-red-500 mb-4" />
            <p className="text-xl font-bold text-gray-700">{adminuser?.length || 0}</p>
            <p className="text-gray-500">Admins</p>
          </div>
        </div>

        {/* Top Products Section */}
        <Gettopproduct className="mt-20" />
      </div>

      {/* Recent Activity Section */}
      <div className="mt-10 p-10 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Recent Activity</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentuser?.length > 0 ? (
            recentuser.map((logs) => (
              <div
                key={logs._id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <LuActivity className="text-blue-500 text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{logs.userId.name || "Unknown User"}</h2>
                    <p className="text-sm text-gray-500">{logs.action}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <LuClock className="text-gray-500" />
                  <FormattedTime timestamp={logs.createdAt} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent activity logs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboardpage;