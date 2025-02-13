import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast, { Toaster } from 'react-hot-toast';



const initialState={
    getallproduct:null,
    isallproductget:false,
    isproductadd:false,
    isproductremove:false
  
}



export const Addproduct=createAsyncThunk('product/addproduct',async(product,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.post("product/addproduct",product,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product adding failed");
    }
  })


  export const Removeproduct=createAsyncThunk('product/removeproduct',async(ProductId,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.post(`product/removeproduct/${ProductId}`,ProductId,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product adding failed");
    }
  })



  export const getallproducts=createAsyncThunk('product/getproduct',async(_,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.get("product/getproduct",_,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product getting failed");
    }
  })









const productSlice = createSlice({
name:"product",
initialState:initialState,
reducers:{},
extraReducers:(builder)=>{
  builder
 .addCase(Addproduct.pending,(state)=>{

   state.isproductadd=true
 
 })
 .addCase(Addproduct.fulfilled,(state,action)=>{
  state.isproductadd=false

  toast.success(" Product add succcessfully")

 })
 

 .addCase(Addproduct.rejected,(state,action)=>{
    state.isproductadd=false
  toast.error( 'Error adding product logout');
 })



 .addCase( getallproducts.pending,(state)=>{

    state.isallproductget=true
  
  })
  .addCase( getallproducts.fulfilled,(state,action)=>{
   state.isallproductget=false
   state.getallproduct=action.payload
   toast.success( action.payload||" Product add succcessfully")
 
  })
  
 
  .addCase( getallproducts.rejected,(state,action)=>{
     state.isallproductget=false
   toast.error( action.payload|| 'Error In adding product logout');
  })


  .addCase(Removeproduct.pending,(state)=>{

    state.isproductremove=true
  
  })
  .addCase(Removeproduct.fulfilled,(state,action)=>{
   state.isproductremove=false
  
   toast.success(" Product remove succcessfully")
 
  })
  
 
  .addCase( Removeproduct.rejected,(state,action)=>{
     state.isproductremove=false
   toast.error( 'Error In remove product logout');
  })







}
  


});





export default productSlice.reducer;