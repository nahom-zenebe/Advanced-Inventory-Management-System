import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopNavbar from "../Components/TopNavbar";
import { IoCameraOutline } from "react-icons/io5";
import userPlaceholder from "../images/user.png";
import { updateProfile } from "../features/authSlice";
import toast from "react-hot-toast";

function ProfilePage() {
  const dispatch = useDispatch();
  const { Authuser, updatenewProfile } = useSelector((state) => state.auth);
  const [image, setImage] = useState(userPlaceholder);

  useEffect(() => {
    if (Authuser) {
      console.log("User authenticated:", Authuser);
    }
  }, [Authuser]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64Image = reader.result;
      setImage(base64Image);

      dispatch(updateProfile(base64Image))
        .unwrap()
        .then(() => toast.success("Profile updated successfully!"))
        .catch(() => toast.error("Failed to update profile image."));
    };
  };

  // Get user data from state (updated profile or fallback)
  const user = updatenewProfile?.updatedUser || Authuser || {
    name: "Guest",
    email: "guest@gmail.com",
    role: "Role",
    ProfilePic: userPlaceholder,
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <TopNavbar />
      <div className="container mx-auto px-6 py-12">

        <div className="flex mt-8">
          <div className="bg-white w-72 rounded-xl shadow-lg p-6 text-center">
            <div className="relative mb-6">
              <img
                className="border-4 ml-16 border-blue-500 h-32 w-32 rounded-full object-cover shadow-lg"
                src={user.ProfilePic || image}
                alt="Profile"
              />
              <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleImageChange} />
              <label htmlFor="fileInput" className="absolute bottom-2 right-12 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                <IoCameraOutline className="text-white text-lg" />
              </label>
            </div>

            <div className="flex mt-4 ml-12">
              <label className="flex text-gray-600 text-sm font-semibold">Name:</label>
              <p className="text-gray-900 text-lg font-medium">{Authuser?.savedUser?.name}</p>
            </div>

            <div className="mt-6 flex ml-12">
              <label className="flex text-gray-600 text-sm font-semibold">Email:</label>
              <p className="text-gray-900 text-lg font-medium">{Authuser?.savedUser?.email}</p>
            </div>

            <div className="mt-6 flex ml-12">
              <label className="flex text-gray-600 text-sm font-semibold">Role:</label>
              <p className="text-gray-900 text-lg font-medium capitalize">{Authuser?.savedUser?.role}</p>
            </div>
          </div>

          <div className="bg-gray-200 rounded-xl flex justify-around h-96 pt-10 w-5/6 ml-10">
            <div className="bg-gray-50 w-56 h-40 rounded-lg shadow-md"></div>
            <div className="bg-gray-50 w-56 h-40 rounded-lg shadow-md"></div>
            <div className="bg-gray-50 w-56 h-40 rounded-lg shadow-md"></div>
          </div>
        </div>

        <div className="mt-10 bg-white p-8 rounded-lg shadow-lg text-center">
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
