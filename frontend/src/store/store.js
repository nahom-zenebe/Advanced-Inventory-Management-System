
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productReducer from "../features/productSlice"
import categoryReducer from "../features/categorySlice"
import supplierReducer from "../features/SupplierSlice"
const store=configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        category:categoryReducer,
        supplier:supplierReducer,
    }
})
export default store;