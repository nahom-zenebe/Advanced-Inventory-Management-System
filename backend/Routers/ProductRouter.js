const express=require("express")
const router=express.Router()
const {Addproduct,RemoveProduct,SearchProduct,EditProduct}=require('../controller/productController')



router.post("/addproduct",Addproduct)
router.delete("/removeproduct",RemoveProduct)
router.get("/product",SearchProduct)
router.put("/editproduct/:productId",EditProduct)





module.exports=router