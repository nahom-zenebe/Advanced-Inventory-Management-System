import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
  getallsales: null,
  isgetallsales: false,
  iscreatedsales: false,
  editedsales:null
  
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


 
export const EditSales = createAsyncThunk(
  "sales/sales",
  async ({ salesId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `sales/sales/${salesId}`, 
        updatedData, 
        { withCredentials: true }
      );
      toast.success("Supplier updated successfully"); 
      return response.data; 
    } catch (error) {
      console.log(error)
      const errorMessage =
        error.response?.data?.message || "Failed to update supplier. Please try again.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
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


      .addCase(EditSales.fulfilled,(state,action)=>{
        state.editedsales=action.payload
       
       
       })
       
       
       .addCase(EditSales.rejected,(state,action)=>{
       
       toast.error( 'Error In founding sales');
       })
       


    
      



  },
});

export default salesSlice.reducer;
