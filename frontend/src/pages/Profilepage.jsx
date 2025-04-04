import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopNavbar from "../Components/TopNavbar";
import { IoCameraOutline } from "react-icons/io5";
import image from "../images/user.png";
import { updateProfile } from "../features/authSlice";
import toast from "react-hot-toast";
import FormattedTime from "../lib/FormattedTime ";

function ProfilePage() {
  const dispatch = useDispatch();
  const { Authuser } = useSelector((state) => state.auth);
  const { userdata } = useSelector((state) => state.activity);
  const [images, setImage] = useState(null);

console.log(userdata)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }


    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser ) {
      toast.error("User not authenticated. Please log in again.");
      return;
    }


    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;

      try {
        
        const response = await dispatch(updateProfile(base64Image)).unwrap();
        toast.success("Profile updated successfully");
        setImage(response?.updatedUser?.ProfilePic); 
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(error || "Failed to upload image. Please try again.");
      }
    };

    reader.onerror = () => {
      toast.error("Error reading file");
    };
  };

  return (
    <div className="min-h-screen bg-base-100 text-gray-900">
      <TopNavbar />
      <div className="container  bg-base-100mx-auto px-6 py-12">
        <div className=" flex bg-base-100 mt-8">
      
          <div className=" bg-base-100 border-gray-600 w-72 rounded-xl shadow-lg p-6 text-center">
            <div className="border-gray-600 relative mb-6 bg-base-100">
              <img
                className="border-4 ml-16 border-blue-500 h-32 w-32 rounded-full object-cover shadow-lg"
                src={ Authuser?.ProfilePic||images|| image}
                alt="Profile"
              />
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="fileInput"
                className="absolute bottom-2 right-12 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
              >
                <IoCameraOutline className="text-white text-lg" />
              </label>
            </div>

          
            <div className="flex mt-4 ml-12 bg-base-100">
              <label className="flex text-gray-600 text-sm font-semibold">Name:</label>
              <p className="bg-base-100 mn-3  text-gray-600 text-lg font-medium">{Authuser?.name || "Guest"}</p>
            </div>

            <div className="mt-6 flex ml-12 bg-base-100">
              <label className="flex text-gray-600 text-sm font-semibold">Email:</label>
              <p className="bg-base-100   text-gray-600 text-lg font-medium">{Authuser?.email || "Guest@gmail.com"}</p>
            </div>

            <div className="mt-6 flex ml-12 bg-base-100">
              <label className="flex text-gray-600 text-sm font-semibold">Role:</label>
              <p className="bg-base-100  text-gray-600 text-lg font-medium capitalize">{Authuser?.role || "staff"}</p>
            </div>
          </div>

      
          <div className=" rounded-xl bg-base-100 flex flex-col h-96 pt-10 w-5/6 ml-10 overflow-y-auto shadow-md">
            <h1 className="text-lg  font-semibold  text-gray-600 mb-4 px-4">Recent Activity</h1>
            <div className="space-y-4 px-4">
              {userdata && userdata.length > 0 ? (
                userdata[0].map((log, index) => (
                  <div key={index} className="border-b bg-base-100 py-4">
                    <h2 className="text-lg bg-base-100 font-medium text-gray-900">{log.action}</h2>
                    <p className="text-sm bg-base-100 text-gray-600">{log.description}</p>
                    <p className="text-sm bg-base-100 text-gray-500">
                      Affected part: <span className="font-medium">{log.entity}</span>
                    </p>
                    <p className="text-sm bg-base-100 text-gray-500">
                      IP Address: <span className="font-medium">{log.ipAddress}</span>
                    </p>
                    <FormattedTime timestamp={log.createdAt} />
                  </div>
                ))
              ) : (
                <p className="text-center bg-base-100 text-gray-500">No activity logs available</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;