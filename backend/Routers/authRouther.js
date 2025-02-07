const express=require("express")
const router=express.Router()
const {signup,login,updateProfile,logout}=require('../controller/authcontroller')
const {authmiddleware}=require('../middleware/Authmiddleware')

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/updateProfile",updateProfile)








module.exports=router