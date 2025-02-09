const express=require("express")
const {MongoDBconfig }=require('./libs/mongoconfig')
const app=express()
const cors=require('cors')
const authrouter=require('./Routers/authRouther')
const productrouter=require('./Routers/ProductRouter')
const orderrouter=require('./Routers/orderRouter')
const categoryrouter=require("./Routers/categoryRouter")
const cookieParser = require('cookie-parser');





require("dotenv").config()
const PORT=process.env.PORT || 3003

app.use(cors({
    origin: "http://your-frontend.com", 
    methods: "GET,POST,PUT,DELETE", 
    allowedHeaders: "Content-Type,Authorization", 
    credentials: true, }
))
app.use(cookieParser())


app.use('/api/auth',authrouter)
app.use('/api/product',productrouter)
app.use('/api/order',orderrouter)
app.use('/api/category',categoryrouter)

app.listen(PORT,()=>{
    MongoDBconfig()
    console.log(`The server is running at port ${PORT}`)

})