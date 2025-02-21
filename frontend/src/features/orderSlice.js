import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast, { Toaster } from 'react-hot-toast';



const initialState={
    
  
}



export const createdOrde=createAsyncThunk('product/createorder',async(product,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.post("product/createorder",product,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product adding failed");
    }
  })


  export const Removedorder=createAsyncThunk('product/removeorder',async(productId,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.delete(`product/removeorder/${productId}`,productId,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product remove failed");
    }
  })

  
  export const updatestatusOrder = createAsyncThunk(
    'product/editproduct',
    async ({ id, updatedData }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`product/editproduct/${id}`, { productId: id, updatedData }, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Product edit failed");
      }
    }
  );





  export const gettingallOrder=createAsyncThunk('product/getproduct',async(_,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.get("product/getproduct",{ withCredentials: true,})
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



 .addCase( gettingallproducts.pending,(state)=>{

    state.isallproductget=true
  
  })
  .addCase(gettingallproducts.fulfilled, (state, action) => {
    state.isallproductget = false;
    state.getallproduct = action.payload.Products || [];
    toast.success("Products fetched successfully");
  })
  
 
  .addCase( gettingallproducts.rejected,(state,action)=>{
     state.isallproductget=false
   toast.error( action.payload|| 'Error In adding product logout');
  })


  .addCase(Removeproduct.pending,(state)=>{

    state.isproductremove=true
  
  })
  

  .addCase(Removeproduct.fulfilled, (state, action) => {
    state.isproductremove = false;
    state.getallproduct = state.getallproduct.filter(product => product._id !== action.meta.arg);
    toast.success("Product removed successfully");
  })
  
  
 
  .addCase( Removeproduct.rejected,(state,action)=>{
     state.isproductremove=false
   toast.error( 'Error In remove product logout');
  })



  .addCase(Addproduct.pending,(state)=>{

    state.isproductadd=true
  
  })
  .addCase(Addproduct.fulfilled,(state,action)=>{
   state.isproductadd=false
   state.getallproduct.push(action.payload);
   toast.success( 'product remove successfully');
 
  })
  
 
  .addCase(Addproduct.rejected,(state,action)=>{
     state.isproductadd=false   
     toast.error( 'Error In remove product');
  
  })




  .addCase(  Searchproduct.pending,(state)=>{
     state.issearchdata=true

  
  })
  .addCase( Searchproduct.fulfilled,(state,action)=>{
    state.issearchdata=false 
    state.searchdata=action.payload
 
 
  })
  
 
  .addCase(   Searchproduct.rejected,(state,action)=>{
    state.issearchdata=false
   toast.error( 'Error In founding  product');
  })




  .addCase(EditProduct.pending,(state)=>{
    state.iseditedProduct=true

 
 })
 .addCase(EditProduct.fulfilled,(state,action)=>{
   state.iseditedProduct=false 
   state.editedProduct=action.payload


 })
 

 .addCase( EditProduct.rejected,(state,action)=>{
   state.iseditedProduct=false
  toast.error( 'Error In founding  product');
 })








}
  


});





export default productSlice.reducer;