import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
  getallCategory: null,
  isgetallCategory: false,
  iscreatedCategory: false,
};


export const CreateCategory = createAsyncThunk(
  'category/createcategory',
  async (Category, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("category/createcategory", Category, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Category creation failed");
    }
  }
);

export const gettingallCategory = createAsyncThunk(
  'category/getcategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("category/getcategory", { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Category retrieval failed");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
 
   
  
      .addCase(gettingallCategory.pending, (state) => {
        state.isgetallCategory = true;
      })
      .addCase(gettingallCategory.fulfilled, (state, action) => {
        state.isgetallCategory = false;
        state.getallCategory = action.payload.categoryswithProductCount || [];

      })
      
      
      .addCase(gettingallCategory.rejected, (state, action) => {
        state.isgetallCategory = false;
        toast.error(action.payload || 'Error retrieving categories');
      })



      .addCase(CreateCategory.pending, (state) => {
        state.iscreatedCategory = true;
      })
      .addCase(CreateCategory.fulfilled, (state, action) => {
        state.iscreatedCategory = false;
        state.getallCategory.push(action.payload);
        toast.success("Category created successfully");
      })
      .addCase(CreateCategory.rejected, (state, action) => {
        state.iscreatedCategory = false;
        toast.error('Error creating category');
      })
      



  },
});

export default categorySlice.reducer;
