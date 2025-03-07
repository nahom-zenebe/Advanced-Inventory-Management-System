import React, { useState, useEffect } from "react";
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
  const [images, setImage] = useState(null);
  const { userdata } = useSelector((state) => state.activity);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('authUser'));
    if (userData) {
      dispatch({ type: 'auth/setAuthUser', payload: userData });
    }
  }, [dispatch]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      toast.error('No file selected');
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = async () => {
      const base64Image = reader.result.split(',')[1]; 
  
      try {
        const response = await dispatch(updateProfile(base64Image)).unwrap(); 
        toast.success('Profile updated successfully');
        setImage(response.updatedUser.ProfilePic); 
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image. Please try again.');
      }
    };
  
    reader.onerror = () => {
      toast.error('Error reading file');
    };
  };

  
  console.log(userdata);

  return (
    <div className="min-h-screen bg-base-100 bg-gray-100 text-gray-900">
      <TopNavbar />
      <div className="container mx-auto px-6 py-12">
        <div className="flex mt-8">
          <div className="bg-white w-72 rounded-xl shadow-lg p-6 text-center">
            <div className="relative mb-6">
              <img
                className="border-4 ml-16 border-blue-500 h-32 w-32 rounded-full object-cover shadow-lg"
                src={Authuser?.ProfilePic || images || image}
                alt="Profile"
              />
              <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleImageUpload} />
              <label htmlFor="fileInput" className="absolute bottom-2 right-12 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                <IoCameraOutline className="text-white text-lg" />
              </label>
            </div>

            <div className="flex mt-4 ml-12">
              <label className="flex text-gray-600 text-sm font-semibold">Name:</label>
              <p className="text-gray-900 text-lg font-medium">{Authuser?.name || "Guest"}</p>
            </div>

            <div className="mt-6 flex ml-12">
              <label className="flex text-gray-600 text-sm font-semibold">Email:</label>
              <p className="text-gray-900 text-lg font-medium">{Authuser?.email || "Guest@gmail.com"}</p>
            </div>

            <div className="mt-6 flex ml-12">
              <label className="flex text-gray-600 text-sm font-semibold">Role:</label>
              <p className="text-gray-900 text-lg font-medium capitalize">{Authuser?.role || "staff"}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl flex flex-col h-96 pt-10 w-5/6 ml-10 overflow-y-auto shadow-md">
            <h1 className="text-lg font-semibold mb-4 px-4">Recent Activity</h1>
            <div className="space-y-4 px-4">
  {userdata && userdata.length > 0 ? (
    // Access the first array inside userdata (index 0)
    userdata[0].map((log, index) => (
      <div key={index} className="border-b py-4">
        <h2 className="text-lg font-medium text-gray-900">{log.action}</h2>
        <p className="text-sm text-gray-600"> {log.description}</p>
        <p className="text-sm text-gray-500">Affected part: <span className="font-medium">{log.entity}</span></p>
        <p className="text-sm text-gray-500">IP Address: <span className="font-medium">{log.ipAddress}</span></p>
        <FormattedTime timestamp={log.createdAt} />
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No activity logs available</p>
  )}
</div>

          </div>
        </div>

        <div className="mt-10 bg-base-100 bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 text-sm font-semibold">Phone:</label>
              <p className="text-gray-900 text-lg font-medium">(123) 456-7890</p>
            </div>

            <div>
              <label className="text-gray-600 text-sm font-semibold">Address:</label>
              <p className="text-gray-900 text-lg font-medium">123 Main Street, City, Country</p>
            </div>

            <div>
              <label className="text-gray-600 text-sm font-semibold">Social Media:</label>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="fab fa-facebook-square text-2xl"></i>
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-700">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
