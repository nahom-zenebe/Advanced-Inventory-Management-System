const express=require("express")
const {MongoDBconfig }=require('./libs/mongoconfig')
const app=express()
const cors=require('cors')
const auth=require('./Routers/authRouther')






require("dotenv").config()
const PORT=process.env.PORT || 3003

app.use(cors({
    origin: "http://your-frontend.com", 
    methods: "GET,POST,PUT,DELETE", 
    allowedHeaders: "Content-Type,Authorization", 
    credentials: true, }
))

app.use('/api/auth',auth)


app.listen(PORT,()=>{
    MongoDBconfig()
    console.log(`The server is running at port ${PORT}`)

})