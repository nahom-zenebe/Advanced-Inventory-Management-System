const { Timestamp } = require('mongodb')
const mongoose=require('mongoose')




const UserSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }, 
    role:{
        type:String,
        enum:['admin','manager','staff'],
        default:'staff',
    
    },
    createdAt:{
        type:Date,
        default:Date.now

    },
    Timestamp:true


})

const User=mongoose.model("User",UserSchema)

module.exports=User