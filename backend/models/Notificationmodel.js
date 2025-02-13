
const mongoose=require('mongoose')




const NotificationSchema= new mongoose.Schema({

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

const Notification=mongoose.model("Notification",NotificationSchema)

module.exports=Notification