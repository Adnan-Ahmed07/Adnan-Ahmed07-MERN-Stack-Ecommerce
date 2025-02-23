require("dotenv").config();
const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const customerProductsRouter = require("./routes/Customer/products-routes");
const customercartRouter = require("./routes/Customer/cart-routes");
const customerAddressRouter = require("./routes/Customer/address-routes");
const customerOrderRouter = require("./routes/Customer/order-routes");
mongoose.connect(process.env.API_KEY).then(()=>console.log('MongoDB connected')).catch(err=>console.log(err));

const app=express();
const PORT =process.env.PORT || 5000;

app.use(
  cors({
  origin:"http://localhost:5173",
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type','Authorization','Cache-Control','Expires','Pragma'],
  credentials:true


  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/customer/products", customerProductsRouter);
app.use("/api/customer/cart", customercartRouter);
app.use("/api/customer/address", customerAddressRouter);
app.use("/api/customer/order", customerOrderRouter);
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));