
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productReducer from "../features/productSlice"
import categoryReducer from "../features/categorySlice"
import supplierReducer from "../features/SupplierSlice"
import  activityReducer from '../features/activitySlice'
import orderReducer from "../features/orderSlice"
import notificationReducer from  "../features/notificationSlice"

const store=configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        category:categoryReducer,
        supplier:supplierReducer,
        activity:activityReducer,
        order:orderReducer,
        notification:notificationReducer
    }
})
export default store;