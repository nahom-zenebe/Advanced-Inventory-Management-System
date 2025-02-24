import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast, { Toaster } from 'react-hot-toast';




const initialState={
      Authuser:null,
      isUserSignup:false,
      isUserLogin:false,
      token:localStorage.getItem("token")||null,
      updatenewProfile:null,
      isupdateProfile:false
    
}


export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", credentials,{ withCredentials: true,});
      localStorage.setItem("user", response.data.savedUser); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const login=createAsyncThunk('auth/login',async(credentials,{rejectWithValue})=>{
  try {
     const response=await axiosInstance.post("auth/login",credentials,{ withCredentials: true,})
     localStorage.setItem("user",response.data.savedUser)
     return response.data;

    
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
})

export const logout=createAsyncThunk("auth/logout",async(_,{rejectWithValue})=>{
  try {
  
    localStorage.removeItem("token")
    return null
    
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Logout failed");
  }
})

export const updateProfile=createAsyncThunk("auth/updateProfile",async( base64Image,{rejectWithValue})=>{
  try {

    const response=await axiosInstance.put("auth/updateProfile",  { ProfilePic: base64Image }, { headers: { 'Content-Type': 'application/json' } })
    return response.data
    


  } catch (error) {

    return rejectWithValue(error.response?.data?.message || "Update Profile failed");
  }
})



const authSlice = createSlice({
  name:"auth",
  initialState:initialState,
  reducers:{},
  extraReducers:(   builder)=>{
    builder
   .addCase(signup.pending,(state)=>{
 
     state.isUserSignup=true
   
   })
   .addCase(signup.fulfilled,(state,action)=>{
    state.isUserSignup=false
    state.Authuser=action.payload
    state.token = action.payload.token;

    toast.success("succcessfully signup")

   })
   

   .addCase(signup.rejected,(state,action)=>{
    state.isUserSignup=false
    toast.error(action.payload || 'Error during logout');
   })
   
   .addCase(login.pending,(state)=>{
       state.isUserLogin=true
       


   })

   .addCase(login.fulfilled,(state,action)=>{
    state.isUserLogin=false
    toast.success("succcessfully login")
      state.token = action.payload.token;

   })

   .addCase(login.rejected,(state,action)=>{
    state.isUserLogin=false
    toast.error(action.payload || 'Error during logout');
   })



   .addCase(logout.fulfilled,(state,action)=>{
     state.Authuser=null
     state.token=null

    toast.success("succcessfully logout")
   })

   .addCase(logout.rejected,(state,action)=>{

    toast.error(action.payload || 'Error during logout');

   })


   .addCase(updateProfile.pending,(state)=>{
  state.isupdateProfile=true
   })



   .addCase(updateProfile.fulfilled, (state, action) => {
    state.isupdateProfile = false;
    state.updatenewProfile = action.payload; 
    toast.success("Profile updated successfully!");
  })
  

   .addCase(updateProfile.rejected,(state,action)=>{
   state.isupdateProfile=false
    toast.error(action.payload || 'Error during update profile');

   })



 


   






  }

  
    


  });
  




  export default authSlice.reducer;