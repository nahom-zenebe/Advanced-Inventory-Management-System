const { Timestamp } = require('mongodb')
const mongoose=require('mongoose')




const OrderSchema= new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Desciption:{
        type:String,
        require:true,

    },
   Product:[{
    product:{type:mongoose.Schema.Types.ObjectId,
        ref:"Product"},
    quantity:{
        type:Number,
           require:true
    },
    price:{
        type:Number,
        require:true
    }
   }],
    
   totalAmount:{type:Number,
    require:true,
   },
   status:{
    type:String,
    enum:["pending","shipped","delivered"]
   },
   orderDate:{
    type:Date,
    default:Date.now
   },
   invoiceUrl:{
    type:String
},

    Timestamp:true


})

const Product=mongoose.model("User",ProductSchema)

module.exports=Product