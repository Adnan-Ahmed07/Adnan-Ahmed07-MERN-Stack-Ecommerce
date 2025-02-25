import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice'
import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";
import customerProductSlice from"./customer/products-slice"
import customerCartSlice from"./customer/cart-slice"
import customerAddressSlice from"./customer/address-slice"
import CustomerOrderSlice from "./customer/order-slice"
import SearchSlice from "./customer/search-slice";
const store=configureStore({ 
   
  reducer:{
    auth:authReducer,
    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    customerProducts:customerProductSlice,
    customerCart:customerCartSlice,
    customerAddress:customerAddressSlice,
    customerOrder:CustomerOrderSlice,
    customerSeach:SearchSlice,
  }

})

export default store;