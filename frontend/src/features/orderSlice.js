import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast, { Toaster } from 'react-hot-toast';



const initialState={
  getorder:[],
  isgetorder:false,
  isorderadd:true,
  isorderremove:true,
  editorder:null,
  iseditorder:false,
  issearchdata:true,
  searchdata:null,
  isshowgraph:false,
  statusgraph:null


    
  
}



export const createdOrder=createAsyncThunk('order/createorder',async(order,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.post("order/createorder",order,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "order adding failed");
    }
  })


  export const Removedorder=createAsyncThunk('order/removeorder/',async(OrderId,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.delete(`order/removeorder/${OrderId}`,OrderId,{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response?.data?.message || "Order remove failed");
    }
  })

  
  export const updatestatusOrder = createAsyncThunk(
    'order/updatestatusOrder',
    async ({ OrderId, updatedData }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`order/updatestatusOrder/${OrderId}`, { OrderId, updatedData }, { withCredentials: true });
        return response.data;
      } catch (error) {
       
        return rejectWithValue(error.response?.data?.message || "Product edit failed");
      }
    }
  );



  export const SearchOrder=createAsyncThunk('order/Searchdata',async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`order/Searchdata?query=${query}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Order getting failed");
    }
  })





  export const gettingallOrder=createAsyncThunk('order/getorders',async(_,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.get("order/getorders",{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "order getting failed");
    }
  })





  export const getstatusgraphOrder=createAsyncThunk('order/graphstatusorder',async(_,{rejectWithValue})=>{
    try {
       const response=await axiosInstance.get("order/graphstatusorder",{ withCredentials: true,})
       return response.data;
  
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "order getting graph failed");
    }
  })



  export const EditOrder = createAsyncThunk(
    'supplier/updatesupplier',
    async ({ OrderId, updatedData }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(
          `updatesupplier/${ OrderId}`,
          { OrderId, updatedData },
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to update supplier. Please try again.";
        toast.error(errorMessage); 
        return rejectWithValue(errorMessage);
      }
    }
  );

  









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
    state.isgetorder = false;
    state.getorder = action.payload; 
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
    state.getorder.push(action.payload);
    toast.success("Order removed successfully");
  })
  
  
 
  .addCase( createdOrder.rejected,(state,action)=>{
     state.isorderadd=false
   toast.error( 'Error In remove Order ');
  })



  .addCase(Removedorder.pending,(state)=>{

    state.isorderremove=true
  
  })
  .addCase(Removedorder.fulfilled, (state, action) => {
    state.isorderremove = false;
    state.getorder = state.getorder.filter(order => order._id !== action.meta.arg);
    toast.success('Order removed successfully');
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


.addCase( getstatusgraphOrder.pending,(state)=>{
  state. isshowgraph=true



})
.addCase( getstatusgraphOrder.fulfilled,(state,action)=>{
 state.isshowgraph=false 
 state. statusgraph=action.payload


})


.addCase( getstatusgraphOrder.rejected,(state,action)=>{
 state.isshowgraph=false
toast.error( 'Error In founding graph  Order');
})


 







}
  


});





export default orderSlice.reducer;