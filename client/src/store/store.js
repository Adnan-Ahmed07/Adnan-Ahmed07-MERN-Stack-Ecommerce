import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice'
import adminProductsSlice from "./admin/products-slice";
import CustomerProductSlice from"./customer/products-slice"
const store=configureStore({ 
   
  reducer:{
    auth:authReducer,
    adminProducts: adminProductsSlice,
    customerProducts:CustomerProductSlice,
  }

})

export default store;