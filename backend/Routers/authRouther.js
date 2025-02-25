const express=require("express")
const router=express.Router()
const {signup,login,updateProfile,logout}=require('../controller/authcontroller')
const {authmiddleware,adminmiddleware,managermiddleware}=require('../middleware/Authmiddleware')

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",authmiddleware,logout)
router.put("/updateProfile",authmiddleware,updateProfile)








module.exports=router