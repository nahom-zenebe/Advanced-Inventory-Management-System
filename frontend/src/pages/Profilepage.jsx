import React, { useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoCameraOutline } from "react-icons/io5";
import userPlaceholder from "../images/user.png";
import { updateProfile } from "../features/authSlice";
import { useDispatch,useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function ProfilePage() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(userPlaceholder);
  const { updatenewProfile,Authuser, isUserSignup } = useSelector((state) => state.auth);



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
console.log( updatenewProfile)

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <TopNavbar />
      <div className="flex flex-col items-center pt-10">
        <h1 className="text-3xl font-semibold mb-6">Profile Page</h1>
        
   
        <div className="relative">
          <img
            className="border-4 border-gray-400 h-32 w-32 rounded-full object-cover shadow-lg"
            src={updatenewProfile.updatedUser.ProfilePic||image}
            alt="Profile"
          />

     
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

        
          <label
            htmlFor="fileInput"
            className="absolute bottom-2 right-2 bg-gray-400  p-2 rounded-full cursor-pointer "
          >
            <IoCameraOutline className="text-white text-lg" />
          </label>
        </div>


      </div>

<h1>{updatenewProfile.updatedUser.name}</h1>
<h1>{updatenewProfile.updatedUser.email}</h1>
<h1>{updatenewProfile.updatedUser.role}</h1>
    </div>
  );
}

export default ProfilePage;
