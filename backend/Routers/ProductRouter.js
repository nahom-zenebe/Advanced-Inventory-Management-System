const express=require("express")
const router=express.Router()
const {Addproduct,RemoveProduct,SearchProduct,EditProduct,getProduct}=require('../controller/productController')
const {authmiddleware,adminmiddleware,managermiddleware}=require('../middleware/Authmiddleware')


router.post("/addproduct",authmiddleware,Addproduct)
router.delete("/removeproduct/:productId",authmiddleware,RemoveProduct)
router.get("/getproduct",authmiddleware,getProduct)
router.get("/searchproduct",authmiddleware,SearchProduct)
router.put("/editproduct/:productId",authmiddleware,EditProduct)





module.exports=router