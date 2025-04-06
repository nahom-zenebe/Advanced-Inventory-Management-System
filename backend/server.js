const express = require("express");
const { MongoDBconfig } = require('./libs/mongoconfig');
const { Server } = require("socket.io");
const http = require("http");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authrouter = require('./Routers/authRouther');
const productrouter = require('./Routers/ProductRouter');
const orderrouter = require('./Routers/orderRouter');
const categoryrouter = require("./Routers/categoryRouter")
const notificationrouter = require("./Routers/notificationRouters");
const activityrouter = require("./Routers/activityRouter");
const inventoryrouter = require('./Routers/inventoryRouter');
const salesrouter = require('./Routers/salesRouter');
const supplierrouter = require('./Routers/supplierrouter');
const stocktransactionrouter = require('./Routers/stocktransactionrouter');


require("dotenv").config();
const PORT = process.env.PORT || 3003;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://advanced-inventory-management-system.vercel.app",
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
  },
});

app.use(cors({
  origin:"https://advanced-inventory-management-system.vercel.app",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));



io.on("connection", (socket) => {
  console.log("A user connected");

 
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
})




app.use(express.json({limit: "10mb"}));
app.use(express.json());
app.set("io", io);
app.use(cookieParser());
app.use('/api/auth', authrouter);
app.use('/api/product', productrouter);
app.use('/api/order', orderrouter);
app.use('/api/category', categoryrouter);
app.use('/api/notification', notificationrouter);
app.use('/api/activitylogs', activityrouter(app)); 
app.use('/api/inventory', inventoryrouter);
app.use('/api/sales', salesrouter);
app.use('/api/supplier', supplierrouter);
app.use("/api/stocktransaction", stocktransactionrouter);




server.listen(PORT, () => {
  MongoDBconfig();
  console.log(`The server is running at port ${PORT}`);
});



module.exports = { io, server};