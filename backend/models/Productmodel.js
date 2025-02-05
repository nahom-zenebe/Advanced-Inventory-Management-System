const { Timestamp } = require('mongodb')
const mongoose=require('mongoose')




const ProductSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    Desciption:{
        type:String,
        require:true,

    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }, 
    Price:{
        type:Number,
        require:true,
        
    
    },
    quantity:{
        type:String,
        unique:true
    },
    image:{
        type:String,

    },
    createdAt:{
        type:Date,
        default:Date.now

    },
    Timestamp:true


})

const Product=mongoose.model("User",ProductSchema)

module.exports=Product