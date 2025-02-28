import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
  getallStocks: [],
  isgetallStocks: false,
  iscreatedStocks: false,

};


export const createStockTransaction = createAsyncThunk(
  'stocktransaction/createStockTransaction',
  async (Stocks, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("stocktransaction/createStockTransaction", Stocks, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Stocks creation failed");
    }
  }
);

export const getAllStockTransactions = createAsyncThunk(
  'stocktransaction/getallStockTransaction',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("stocktransaction/getallStockTransaction", { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Category retrieval failed");
    }
  }
);







const stocktransactionSlice = createSlice({
  name: "stocktransaction",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
 
   
  
      .addCase(getAllStockTransactions.pending, (state) => {
        state.isgetallStocks = true;
      })
      .addCase(getAllStockTransactions.fulfilled, (state, action) => {
        state.isgetallStocks = false;
        state.getallStocks = action.payload;

      })
      
      
      .addCase(getAllStockTransactions.rejected, (state, action) => {
        state.isgetallStocks = false;
        toast.error(action.payload || 'Error retrieving stock transcations');
      })



      .addCase(createStockTransaction .pending, (state) => {
        state.iscreatedStocks = true;
      })
      .addCase(createStockTransaction .fulfilled, (state, action) => {
        state.iscreatedStocks = false;
        state.getallStocks.push(action.payload);
        toast.success("Stock created successfully");
      })
      .addCase(createStockTransaction .rejected, (state, action) => {
        state.iscreatedStocks = false;
        toast.error('Error creating Stock');
      })





     



  },
});

export default stocktransactionSlice.reducer;
