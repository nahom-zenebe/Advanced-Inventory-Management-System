import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoCameraOutline } from "react-icons/io5";
import user from '../images/user.png'
import {updateProfile} from '../features/authSlice'
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';

function ProfilePage() {
    const { updateProfile,isupdateProfile } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      dispatch(updateProfile(image))
      .then(()=>{
         toast.success("image update successfully")

      })
      .catch((error)=>{
        toast.error("image update failed")
      })
    
    }
  };


 

  return (
    <div className="min-h-screen bg-gray-300 text-white">
      <TopNavbar />
      
      <div className="" >
        <input value={image} className="" hidden type="file" id="image/upload"/>
        <img  className="border-2  border-b-gray-900 rounded-full " src={user}></img>
        
        <IoCameraOutline className="absolute text-2xl top-10 left-10"/>


      </div>
    </div>
  );
}

export default ProfilePage;