import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
  Authuser: JSON.parse(localStorage.getItem("user")) || null, 
  isUserSignup: false,
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
  async (base64Image, { getState, rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('authUser'));

      const updatedUser = {
        ...storedUser,
        user: {
          ...storedUser.user,
          ProfilePic: base64Image, 
        },
      };

      const response = await axiosInstance.put('auth/updateProfile', 
        { ProfilePic: base64Image }, 
        { headers: { 'Content-Type': 'application/json' } }
      );

    
      const updatedData = response.data;
      localStorage.setItem('authUser', JSON.stringify(updatedData));

      return updatedData; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);



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
        state.Authuser = action.payload.savedUser; // Update Authuser state
        state.token = action.payload.token; // Update token state
        toast.success("Successfully signed up!");
      })
      .addCase(signup.rejected, (state, action) => {
        state.isUserSignup = false;
        toast.error(action.payload || "Error during signup");
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isUserLogin = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isUserLogin = false;
        state.Authuser = action.payload.user; // Update Authuser state
        state.token = action.payload.token; // Update token state
        toast.success("Successfully logged in!");
      })
      .addCase(login.rejected, (state, action) => {
        state.isUserLogin = false;
        toast.error(action.payload || "Error during login");
      })

      // Logout
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
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isupdateProfile = false;
        state.Authuser = { ...state.Authuser, ProfilePic: action.payload.updatedUser.ProfilePic }; 
        localStorage.setItem("user", JSON.stringify(state.Authuser)); 
        toast.success("Profile updated successfully!");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isupdateProfile = false;
        toast.error(action.payload || "Error during profile update");
      });
  },
});

export default authSlice.reducer;