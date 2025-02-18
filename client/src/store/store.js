import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice'
import adminProductsSlice from "./admin/products-slice";
import customerProductSlice from"./customer/products-slice"
import customerCartSlice from"./customer/cart-slice"
import customerAddressSlice from"./customer/address-slice"
const store=configureStore({ 
   
  reducer:{
    auth:authReducer,
    adminProducts: adminProductsSlice,
    customerProducts:customerProductSlice,
    customerCart:customerCartSlice,
    customerAddress:customerAddressSlice,
  }

})

export default store;