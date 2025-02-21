import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";


const initialState = {
  activityLogs: [],
  isFetching: false,
  isAdding: false,
 
};


export const getAllActivityLogs = createAsyncThunk(
  "activitylogs/getAllLogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("activitylogs/getAllLogs", {
        withCredentials: true,
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch activity logs");
    }
  }
);


export const addActivityLog = createAsyncThunk(
  "activitylogs/addLog",
  async (logData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("activity-logs", logData, {
        withCredentials: true,
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add activity log");
    }
  }
);



const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(getAllActivityLogs.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getAllActivityLogs.fulfilled, (state, action) => {
        state.isFetching = false;
        state.activityLogs = action.payload; 
        toast.success("Activity logs fetched successfully");
      })
      .addCase(getAllActivityLogs.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        toast.error(action.payload || "Error fetching activity logs");
      })

      
      .addCase(addActivityLog.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addActivityLog.fulfilled, (state, action) => {
        state.isAdding = false;
        state.activityLogs.push(action.payload); 
        toast.success("Activity log added successfully");
      })
      .addCase(addActivityLog.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload; 
        toast.error(action.payload || "Error adding activity log");
      })

   
      
  },
});

export default activitySlice.reducer;
