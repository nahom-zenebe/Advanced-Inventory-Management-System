import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
  Authuser: JSON.parse(localStorage.getItem("user")) || null, 
  isUserSignup: false,
  staffuser:null,
  manageruser:null,
  adminuser:null,
  isUserLogin: false,
  token: localStorage.getItem("token") || null,
  isupdateProfile: false,
};


export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/signup", credentials, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(response.data.savedUser)); 
      localStorage.setItem("token", response.data.savedUser.token); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/login", credentials, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      localStorage.setItem("token", response.data.token); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (base64Image, { rejectWithValue }) => {
    try {
  
      const storedUser = JSON.parse(localStorage.getItem('user')); 
      
      if (!storedUser || !storedUser.token) {
        return rejectWithValue('User not authenticated');
      }

      
      const response = await axiosInstance.put(
        'auth/updateProfile',
        { ProfilePic: base64Image }, 
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedUser.token}`, 
          },
        }
      );

      const updatedData = response.data;

      
      if (updatedData && updatedData.updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedData.updatedUser)); 
        return updatedData.updatedUser; 
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);




export const staffUser=createAsyncThunk('auth/staffuser',async(_,{rejectWithValue})=>{
  try {

    const response=await axiosInstance.get('auth/staffuser',_,{ withCredentials: true });
    return response.data
    
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get staff user');
  }
})



export const managerUser=createAsyncThunk('auth/manageruser',async(_,{rejectWithValue})=>{
  try {

    const response=await axiosInstance.get('auth/manageruser',_,{ withCredentials: true });
    return response.data
    
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get manager user');
  }
})



export const adminUser=createAsyncThunk('auth/adminuser',async(_,{rejectWithValue})=>{
  try {

    const response=await axiosInstance.get('auth/adminuser',_,{ withCredentials: true });
    return response.data
    
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get admin user user');
  }
})



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isUserSignup = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isUserSignup = false;
        state.Authuser = action.payload.savedUser; 
        state.token = action.payload.token; 
        toast.success("Successfully signed up!");
      })
      .addCase(signup.rejected, (state, action) => {
        state.isUserSignup = false;
        toast.error(action.payload || "Error during signup");
      })

      
      .addCase(login.pending, (state) => {
        state.isUserLogin = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isUserLogin = false;
        state.Authuser = action.payload.user; 
        state.token = action.payload.token; 
        toast.success("Successfully logged in!");
      })
      .addCase(login.rejected, (state, action) => {
        state.isUserLogin = false;
        toast.error(action.payload || "Error during login");
      })

    
      .addCase(logout.fulfilled, (state) => {
        state.Authuser = null;
        state.token = null;
        toast.success("Successfully logged out!");
      })
      .addCase(logout.rejected, (state, action) => {
        toast.error(action.payload || "Error during logout");
      })

      .addCase(updateProfile.pending, (state) => {
        state.isupdateProfile = true;
      })
      

      builder.addCase(updateProfile.fulfilled, (state, action) => {
        state.isupdateProfile = false;
        state.Authuser = { ...state.Authuser, user: action.payload }; 
        localStorage.setItem("authUser", JSON.stringify(state.Authuser));
      })
      
      




      .addCase(staffUser.fulfilled, (state, action) => {
     
        state. staffuser = action.payload
        toast.success("getting user successfully");
      })
      
     
      .addCase(staffUser.rejected,(state,action)=>{

       toast.error( action.payload|| 'Error In user getting');
      })

      


      .addCase(managerUser.fulfilled, (state, action) => {
    
        state.manageruser = action.payload
        toast.success("getting user successfully");
      })
      
     
      .addCase(managerUser.rejected,(state,action)=>{
   
       toast.error( action.payload|| 'Error In getting user');
      })
    




      .addCase(adminUser.fulfilled, (state, action) => {
      
        state.adminuser = action.payload
        toast.success("Products fetched successfully");
      })
      
     
      .addCase(adminUser.rejected,(state,action)=>{
      
       toast.error( action.payload|| 'Error In adding product logout');
      })
    

    

  
  },
});

export default authSlice.reducer;