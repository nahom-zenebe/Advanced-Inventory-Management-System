const express=require("express")
const router=express.Router()
const {createCategory,RemoveCategory,getCategory,updateCategory}=require('../controller/categorycontroller')



router.post("/createcategory",createCategory)
router.get("/getcategory",getCategory)
router.delete("/removecategory",RemoveCategory)
router.put("/updateCategory",updateCategory)





module.exports=router