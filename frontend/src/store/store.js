
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productReducer from "../features/productSlice"


const store=configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer
    }
})
export default store;