const express=require("express")
const router=express.Router()
const {Addproduct,RemoveProduct,SearchProduct,EditProduct,getProduct}=require('../controller/productController')


router.post("/addproduct",Addproduct)
router.delete("/removeproduct/:productId",RemoveProduct)
router.get("/getproduct",getProduct)
router.get("/searchproduct",SearchProduct)
router.put("/editproduct/:productId",EditProduct)





module.exports=router