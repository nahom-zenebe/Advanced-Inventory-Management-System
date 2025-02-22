import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast, { Toaster } from 'react-hot-toast';



const initialState={
  getorder:null,
  isgetorder:false,
  isorderadd:true,
  isorderremove:true,
  editorder:null,
  iseditorder:false,
  issearchdata:true,
  searchdata:null


    
  
}



export const createdOrder=createAsyncThunk('order/createorder',async(order,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.post("order/createorder",order,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "order adding failed");
    }
  })


  export const Removedorder=createAsyncThunk('order/removeorder',async(OrderId,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.delete(`order/removeorder/${OrderId}`,OrderId,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Order remove failed");
    }
  })

  
  export const updatestatusOrder = createAsyncThunk(
    'order/updatestatusOrder/',
    async ({ id, updatedData }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`order/updatestatusOrder/${OrderId}`, { OrderId: id, updatedData }, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Product edit failed");
      }
    }
  );



  export const SearchOrder=createAsyncThunk('order/Searchdata"',async(query,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.get(`order/Searchdata"?query=${query}`,query,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "order getting failed");
    }
  })





  export const gettingallOrder=createAsyncThunk('product/getproduct',async(_,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.get("product/getproduct",{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product getting failed");
    }
  })



  









const orderSlice = createSlice({
name:"order",
initialState:initialState,
reducers:{},
extraReducers:(builder)=>{
  builder



 .addCase(gettingallOrder.pending,(state)=>{

    state.isgetorder=true
  
  })
  .addCase(gettingallOrder.fulfilled, (state, action) => {
    state. isgetorder = false;
    state.getorder = action.payload.Orders || [];
    toast.success("Orders fetched successfully");
  })
  
 
  .addCase( gettingallOrder.rejected,(state,action)=>{
     state.isgetorder=false
   toast.error( action.payload|| 'Error In adding Order ');
  })


  .addCase(createdOrder.pending,(state)=>{

    state.isorderadd=true
  
  })
  

  .addCase(createdOrder.fulfilled, (state, action) => {
    state.isorderadd = false;
    state.getorder = state.getorder.filter(order => order._id !== action.meta.arg);
    toast.success("Order removed successfully");
  })
  
  
 
  .addCase( createdOrder.rejected,(state,action)=>{
     state.isorderadd=false
   toast.error( 'Error In remove Order ');
  })



  .addCase(Removedorder.pending,(state)=>{

    state.isorderremove=true
  
  })
  .addCase(Removedorder.fulfilled,(state,action)=>{
   state.isorderremove=false

   toast.success( 'Order remove successfully');
 
  })
  
 
  .addCase(Removedorder.rejected,(state,action)=>{
     state.isorderremove=false   
     toast.error( 'Order In remove ');
  
  })



  .addCase(updatestatusOrder.pending,(state)=>{
    state.iseditorder=true

 
 })
 .addCase(updatestatusOrder.fulfilled,(state,action)=>{
   state.iseditorder=false 
   state. editorder=action.payload


 })
 

 .addCase( updatestatusOrder.rejected,(state,action)=>{
   state.iseditorder=false
  toast.error( 'Error In founding  Order');
 })

 .addCase(  SearchOrder.pending,(state)=>{
  state.issearchdata=true


})
.addCase( SearchOrder.fulfilled,(state,action)=>{
 state.issearchdata=false 
 state.searchdata=action.payload


})


.addCase( SearchOrder.rejected,(state,action)=>{
 state.issearchdata=false
toast.error( 'Error In founding  Order');
})


 







}
  


});





export default orderSlice.reducer;