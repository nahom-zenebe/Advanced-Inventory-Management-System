const express=require("express")
const router=express.Router()
const {createOrder,updatestatusOrder,Removeorder,getOrder}=require('../controller/orderController')



router.post("/createorder",createOrder)
router.get("/getorders",getOrder)
router.delete("/removeorder",Removeorder)
router.put("/updatestatusOrder",updatestatusOrder)





module.exports=router