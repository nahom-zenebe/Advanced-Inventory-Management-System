
const mongoose=require('mongoose')




const ActivityLogSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    type:{
        type:String,
        enum:["low-stock","new-order","general"],
        require:true,
        read:{
            type:Boolean,
            default:false
        }
    },
    createdAt:{
        type:Date,
        default:Date.now

    },
},
{ timestamps: true }
)

const ActivityLog=mongoose.model("User",ActivityLogSchema)

module.exports=ActivityLog