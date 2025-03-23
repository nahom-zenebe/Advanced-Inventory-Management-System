
const mongoose = require('mongoose')




const OrderSchema= new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Description:{
        type:String,
        required:true,

    },
   Product:{
    product:{type:mongoose.Schema.Types.ObjectId,
        ref:"Product"},
    quantity:{
        type:Number,
           required:true
    },
    price:{
        type:Number,
        required:true
    }
   },
    
   totalAmount:{
    type:Number,
    required:true,
   },
   status:{
    type:String,
    enum:["pending","shipped","delivered"]
   },
   
   invoiceUrl:{
    type:String
},

},
{ timestamps: true }
)

const Order=mongoose.model("Order",OrderSchema)

module.exports=Order