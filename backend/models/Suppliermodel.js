
const mongoose=require('mongoose')




const SupplierSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    contactInfo:{
        phone:{type:String},
        email:{type:String},
        address:{type:String}
    },
    productsSupplied:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Prodcut"

    }],
    createdAt:{
        type:Date,
        default:Date.now

    },

    Timestamp:true


})

const Supplier=mongoose.model("User",SupplierSchema)

module.exports=Supplier