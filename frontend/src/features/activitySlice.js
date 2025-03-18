import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";


const initialState = {
  activityLogs: [],
  isFetching: false,
  isAdding: false,
  userdata:[],
  recentuser:null
 
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





export const getsingleUserActivityLogs = createAsyncThunk(
  "activitylogs/getLogs",
  async (userid, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get( `activitylogs/getLogs/${userid}`, {
        withCredentials: true,
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch activity logs");
    }
  }
);

export const getrecentActivityLogs = createAsyncThunk(
  "activitylogs/getrecentActivitys",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get( `activitylogs/getrecentActivitys`, {
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
  
      })
      .addCase(addActivityLog.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload; 
  
      })






      .addCase( getsingleUserActivityLogs.pending, (state) => {
        
      })
      .addCase( getsingleUserActivityLogs.fulfilled, (state, action) => {
        
        state.userdata.push(action.payload); 
       
      })
      .addCase( getsingleUserActivityLogs.rejected, (state, action) => {

        state.error = action.payload; 
      
      })

      .addCase(getrecentActivityLogs.fulfilled, (state, action) => {
        
        state.recentuser=action.payload
       
      })
      .addCase(getrecentActivityLogs.rejected, (state, action) => {

        state.error = action.payload; 
      
      })
   


      
  },
});

export default activitySlice.reducer;
