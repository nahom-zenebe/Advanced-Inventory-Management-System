const express=require("express")
const {MongoDBconfig }=require('./libs/mongoconfig')
const app=express()






require("dotenv").config()
const PORT=process.env.PORT || 3003










app.listen(PORT,()=>{
    MongoDBconfig()
    console.log(`The server is running at port ${PORT}`)

})