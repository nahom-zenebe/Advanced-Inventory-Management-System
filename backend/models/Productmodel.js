
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
        type:Number,
        unique:true,
        default:0
    },
    image:{
        type:String,

    },
    supplier: { type: mongoose.Schema.Types.ObjectId, 
        ref: "Supplier" },
    createdAt:{
        type:Date,
        default:Date.now

    },
},
{ timestamps: true }

)

const Product=mongoose.model("User",ProductSchema)

module.exports=Product