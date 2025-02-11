
const mongoose=require('mongoose')




const StockTranscationSchema= new mongoose.Schema({
   product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'

   },
   type:{
    type:String,
    enum:["Stock-in","Stock-out"],
    required:true,
    
   },
   quantity:{
    type:Number,
    required:true
   },
   transactionDate:{
    type:Date,
    default:Date.now
   },
   supplier:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Supplier"
   },
},
{ timestamps: true }



)

const StockTranscation=mongoose.model("StockTranscation",StockTranscationSchema)

module.exports=StockTranscation