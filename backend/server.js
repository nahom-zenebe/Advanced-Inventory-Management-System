const express=require("express")
const {MongoDBconfig }=require('./libs/mongoconfig')
const { Server } = require("socket.io");
const http = require("http");
const app=express()
const cors=require('cors')
const authrouter=require('./Routers/authRouther')
const productrouter=require('./Routers/ProductRouter')
const orderrouter=require('./Routers/orderRouter')
const categoryrouter=require("./Routers/categoryRouter")
const notificationrouter=require("./Routers/notificationRouters")
const activityrouter=require("./Routers/activityRouter")
const inventoryrouter=require('./Routers/inventoryRouter')
const salesrouter=require('./Routers/salesRouter')
const supplierrouter=require('./Routers/supplierrouter')
const stocktransactionrouter=require('./Routers/stocktransactionrouter')
const cookieParser = require('cookie-parser');

const server = http.createServer(app);


require("dotenv").config()
const PORT=process.env.PORT || 3003
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"],
    },
  });


app.use(express.json());  

app.use(cookieParser())
app.set("io",io)

app.use('/api/auth',authrouter)
app.use('/api/product',productrouter)
app.use('/api/order',orderrouter)
app.use('/api/category',categoryrouter)
app.use('/api/notification', notificationrouter)
app.use('/api/activitylogs',activityrouter)
app.use('/api/inventory',inventoryrouter)
app.use('/api/salesrouter',salesrouter)
app.use('/api/supplier',supplierrouter)
app.use("/api/stocktransaction",stocktransactionrouter)









server.listen(PORT,()=>{
    MongoDBconfig()
    console.log(`The server is running at port ${PORT}`)

})