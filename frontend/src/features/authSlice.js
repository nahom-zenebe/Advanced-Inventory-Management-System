import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast, { Toaster } from 'react-hot-toast';




const initialState={
      Authuser:null,
      isUserSignup:false,
      isUserLogin:false,
      token:localStorage.getItem("token")||null,
    
}


export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      localStorage.setItem("token", response.data.token); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const login=createAsyncThunk('auth/login',async(credentials,{rejectWithValue})=>{
  try {
     const response=await axiosInstance.post("auth/login",credentials)
     localStorage.setItem("token",response.data.token)
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





   






  }

  
    


  });
  




  export default authSlice.reducer;