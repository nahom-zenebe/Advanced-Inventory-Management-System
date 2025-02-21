const express=require("express")
const router=express.Router()
const {createOrder,updatestatusOrder,Removeorder,getOrder}=require('../controller/orderController')



router.post("/createorder",createOrder)
router.get("/getorders",getOrder)
router.delete("/removeorder/:OrdertId",Removeorder)
router.put("/updatestatusOrder/:OrderId",updatestatusOrder)





module.exports=router