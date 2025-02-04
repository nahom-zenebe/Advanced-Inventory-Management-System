const mongoose=require("mongoose")


require("dotenv").config()

module.exports.MongoDBconfig=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("connected to database successfully")
    })
    .catch((err)=>{
        console.log("MonogoDB Connection Error",err)
    })

}
