import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
  getallsales: null,
  isgetallsales: false,
  iscreatedsales: false,
  
};


export const CreateSales = createAsyncThunk(
    'sales/createsales',
  async (Category, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("sales/createsales", Category, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "sales creation failed");
    }
  }
);

export const gettingallSales = createAsyncThunk(
  'sales/getallsales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("sales/getallsales", { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "sales retrieval failed");
    }
  }
);







const salesSlice = createSlice({
  name: "sales",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
 
   
  
      .addCase(gettingallSales.pending, (state) => {
        state.isgetallsales = true;
      })
      .addCase(gettingallSales.fulfilled, (state, action) => {
        state.isgetallsales = false;
        state.getallsales = action.payload.sales;

      })
      
      
      .addCase(gettingallSales.rejected, (state, action) => {
        state.isgetallsales = false;
        toast.error(action.payload || 'Error retrieving sales');
      })



      .addCase( CreateSales .pending, (state) => {
        state.iscreatedsales = true;
      })
      .addCase( CreateSales .fulfilled, (state, action) => {
        state.iscreatedsales = false;
        state.getallsales.push(action.payload);
        toast.success("sales created successfully");
      })
      .addCase( CreateSales .rejected, (state, action) => {
        state.iscreatedsales = false;
        toast.error('Error creating sales');
      })





    
      



  },
});

export default salesSlice.reducer;
