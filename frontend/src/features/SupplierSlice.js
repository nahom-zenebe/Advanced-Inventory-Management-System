import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
    getallSupplier:null,
    isallSupplier:false,
    isSupplieradd:false,
    isSupplierremove:false,
    searchdata:null,
    issearchdata:false,
    editedSupplier:null,
    iseditedSupplier:false
 
};


export const CreateSupplier = createAsyncThunk(
  'supplier/createsupplier',
  async (Supplier, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("supplier/createsupplier",Supplier, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "supplier creation failed");
    }
  }
);

export const gettingallSupplier = createAsyncThunk(
  'supplier/getallsupplier',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('supplier/getallsupplier', { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Supplier retrieval failed");
    }
  }
);





  
  export const deleteSupplier = createAsyncThunk(
    'supplier/',
    async (supplierId, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.delete(`supplier/${supplierId}`,supplierId, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Supplier remove  failed");
      }
    }
  );
  



const supplierSlice = createSlice({
  name: "supplier",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
 
      .addCase(CreateSupplier .pending, (state) => {
        state.isSupplieradd = true;
      })
      .addCase(CreateSupplier .fulfilled, (state, action) => {
        state.isSupplieradd= false;
        toast.success("Supplier created successfully");
      })
      .addCase(CreateSupplier .rejected, (state, action) => {
        state.isSupplieradd= false;
        toast.error('Error creating Supplier');
      })
      
  
      .addCase(gettingallSupplier.pending, (state) => {
        state.isallSupplier = true;
      })
      .addCase(gettingallSupplier.fulfilled, (state, action) => {
        state.isallSupplier = false;
        state.getallSupplier = action.payload|| [];

      })
      
      
      .addCase(gettingallSupplier.rejected, (state, action) => {
        state. isallSupplier = false;
        toast.error(action.payload || 'Error retrieving Suppliers');
      })




      .addCase(deleteSupplier.pending, (state) => {
        state.isSupplierremove = true;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.isSupplierremove= false;
        state.getallCategory = action.payload.allCategory || [];

      })
      
      
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.isSupplierremove = false;
        toast.error(action.payload || 'Error retrieving   Supplier');
      })



      
  },
});

export default  supplierSlice.reducer;
