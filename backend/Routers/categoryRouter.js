const express=require("express")
const router=express.Router()
const {createCategory,RemoveCategory,getCategory,updateCategory}=require('../controller/categorycontroller')
const {authmiddleware,adminmiddleware,managermiddleware}=require('../middleware/Authmiddleware')



router.post("/createcategory",authmiddleware,createCategory)
router.get("/getcategory",authmiddleware,getCategory)
router.delete("/removecategory/:CategoryId",authmiddleware,RemoveCategory)
router.put("/updateCategory",authmiddleware,updateCategory)







module.exports=router