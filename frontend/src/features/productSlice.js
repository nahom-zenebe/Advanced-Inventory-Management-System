import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast, { Toaster } from 'react-hot-toast';



const initialState={
    getallproduct:null,
    isallproductget:false,
    isproductadd:false,
    isproductremove:false,
    searchdata:null,
    issearchdata:false,
    editedProduct:null,
    iseditedProduct:false,
    gettopproduct:null
  
}



export const Addproduct=createAsyncThunk('product/addproduct',async(product,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.post("product/addproduct",product,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product adding failed");
    }
  })


  export const Removeproduct=createAsyncThunk('product/removeproduct',async(productId,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.delete(`product/removeproduct/${productId}`,productId,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product remove failed");
    }
  })

  
  export const EditProduct = createAsyncThunk(
    'product/editproduct',
    async ({ id, updatedData }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(
          `product/editproduct/${id}`,
          { productId: id, updatedData },
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to update product. Please try again.";
        toast.error(errorMessage); 
        return rejectWithValue(errorMessage);
      }
    }
  );




  export const gettingallproducts=createAsyncThunk('product/getproduct',async(_,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.get("product/getproduct",{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product getting failed");
    }
  })



   export const Searchproduct=createAsyncThunk('product/searchproduct',async(query,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.get(`product/searchproduct?query=${query}`,query,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product adding failed");
    }
  })

  export const getTopProductsByQuantity=createAsyncThunk('product/getTopProductsByQuantity',async(_,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.get(`product/getTopProductsByQuantity`,_,{ withCredentials: true,})
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

  })
  
  
 
  .addCase( Removeproduct.rejected,(state,action)=>{
     state.isproductremove=false

  })



  .addCase(Addproduct.pending,(state)=>{

    state.isproductadd=true
  
  })
  .addCase(Addproduct.fulfilled,(state,action)=>{
   state.isproductadd=false
   state.getallproduct.push(action.payload);
  
 
  })
  
 
  .addCase(Addproduct.rejected,(state,action)=>{
     state.isproductadd=false   

  
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
  
 })




 .addCase( getTopProductsByQuantity.fulfilled,(state,action)=>{

  state.gettopproduct=action.payload.topProducts || []


})


.addCase(  getTopProductsByQuantity.rejected,(state,action)=>{

 toast.error( 'Error In founding  product');
})








}
  


});





export default productSlice.reducer;