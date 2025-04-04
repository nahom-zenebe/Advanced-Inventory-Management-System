import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
  getallCategory: null,
  isgetallCategory: false,
  iscreatedCategory: false,
  iscategoryremove:false,
  searchdata:null
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




export const RemoveCategory = createAsyncThunk(
  'category/removecategory',
  async (CategoryId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`category/removecategory/${CategoryId}`,CategoryId, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Category delete failed");
    }
  }
);



export const SearchCategory=createAsyncThunk('category/searchcategory',async(query,{rejectWithValue})=>{
  try {
     const response=await axiosInstance.get(`category/searchcategory?query=${query}`,query,{ withCredentials: true,})
     return response.data;

    
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "category adding failed");
  }
})



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
        state.getallCategory = action.payload.categoriesWithCount ;

      })
      
      
      .addCase(gettingallCategory.rejected, (state, action) => {
        state.isgetallCategory = false;
   
      })



      .addCase(CreateCategory.pending, (state) => {
        state.iscreatedCategory = true;
      })
      .addCase(CreateCategory.fulfilled, (state, action) => {
        state.iscreatedCategory = false;
        state.getallCategory.push(action.payload);
   
      })
      .addCase(CreateCategory.rejected, (state, action) => {
        state.iscreatedCategory = false;
  
      })





      .addCase(RemoveCategory.pending,(state)=>{

        state.iscategoryremove=true
      
      })
      
    
      .addCase(RemoveCategory.fulfilled, (state, action) => {
        state.iscategoryremove = true;
        state.getallCategory= state.getallCategory.filter(category => category ._id !== action.meta.arg);
   
      })
      
      
     
      .addCase( RemoveCategory.rejected,(state,action)=>{
         state.iscategoryremove=true
  
      })
    
      
      .addCase(SearchCategory.fulfilled,(state,action)=>{
       
        state.searchdata=action.payload
     
     
      })
      
     
      .addCase(SearchCategory.rejected,(state,action)=>{
      
      
      })
    
    


  },
});

export default categorySlice.reducer;
