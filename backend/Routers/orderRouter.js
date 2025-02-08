const express=require("express")
const router=express.Router()
const {createOrder,Removeorder}=require('../controller/orderController')



router.post("/createorder",createOrder)
router.get("/getorders",getOrder)
router.delete("/removeorder",Removeorder)






module.exports=router