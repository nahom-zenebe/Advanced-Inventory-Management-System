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
      <div className="flex flex-col items-center pt-10">
        <h1 className="text-3xl font-semibold mb-6">Profile Information</h1>

        {/* Profile Image Section */}
        <div className="relative">
          <img
            className="border-4 border-gray-300 h-32 w-32 rounded-full object-cover shadow-lg"
            src={user.ProfilePic || image}
            alt="Profile"
          />

          <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleImageChange} />

          <label htmlFor="fileInput" className="absolute bottom-2 right-2 bg-gray-600 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition">
            <IoCameraOutline className="text-white text-lg" />
          </label>
        </div>

        {/* User Information Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold">Name</label>
            <p className="text-gray-900 text-lg font-medium">{user.name}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold">Email</label>
            <p className="text-gray-900 text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-semibold">Role</label>
            <p className="text-gray-900 text-lg font-medium capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
