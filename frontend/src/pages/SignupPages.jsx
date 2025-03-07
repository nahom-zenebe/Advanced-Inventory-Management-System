import React, { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/authSlice";
import { useForm } from "react-hook-form";
import homeImage from '../images/welcomeimage.webp'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";





function SignupPage() {
  const { Authuser, isUserSignup } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigator=useNavigate()

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: yup.string().required("Role is required"),
  });

  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    dispatch(signup(data))
    .then(()=>{
    if(data.role==="staff"){
      navigator('/StaffDashboard')
    } 
    else if(data.role==="admin"){
      navigator('/AdminDashboard')
    }
    else{
      navigator('/ManagerDashboard')
    }
     
    }) 
    .catch((error) => {
    
      console.error("Error in Signup:", error);
    });
   
  
  };

  useEffect(() => {
    if (Authuser) {
      console.log("User already authenticated:", Authuser);
    }
  }, [Authuser]);

  return (
    <div className="min-h-screen bg-base-100 flex bg-base-100 bg-gray-50">
      <div className="w-full sm:w-1/2 p-6 flex items-center justify-center bg-white shadow-lg rounded-xl">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">InventoryPro</h1>
            <p className="text-gray-600">by TechSolutions Inc.</p>
          </div>


          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <label className="block">Role</label>
            <select
              {...register("role")}
              className="mt-4 mb-12 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <p className="text-red-500">{errors.role.message}</p>}

            <div className="flex items-center mb-6">
              <input type="checkbox" id="2fa" className="mr-2" />
              <label htmlFor="2fa" className="text-gray-600 text-sm">Agree to terms and conditions</label>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300">
           {
             isUserSignup ? "Signing....":  "Sign Up"
           }   
            </button>
          </form>

          <div className="text-center mt-6">
            <p>
              Already have an account?
              <Link to="/LoginPage" className="text-blue-600 text-sm hover:underline"> Click here</Link>
            </p>
          </div>
        </div>
      </div>

      <div   style={{ backgroundImage: `url(${homeImage})` }}
  
  className="w-full sm:w-1/2  p-10 bg-cover bg-center text-white flex flex-col justify-center rounded-r-xl"
>
        <h2 className="text-2xl font-bold mb-4">Efficient Inventory Management</h2>
        <p className="mb-6 text-white">Streamline your operations with real-time tracking, automated reports, and seamless integrations.</p>
        <div className=" p-6 rounded-md text-gray-900">
          <p className="text-lg text-white font-semibold">Dashboard Preview</p>
          <p className="text-sm text-white">Monitor stock levels, generate insights, and optimize workflows.</p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
