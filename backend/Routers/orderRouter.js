const express=require("express")
const router=express.Router()
const {createOrder,updatestatusOrder,Removeorder,getOrder}=require('../controller/orderController')
const {authmiddleware,searchOrder,adminmiddleware,managermiddleware}=require('../middleware/Authmiddleware')



router.post("/createorder",authmiddleware,createOrder)
router.get("/getorders",authmiddleware,getOrder)
router.delete("/removeorder/:OrdertId",authmiddleware,Removeorder)
router.put("/updatestatusOrder/:OrderId",authmiddleware,updatestatusOrder)
router.get("/Searchdata",authmiddleware,searchOrder)




module.exports=router