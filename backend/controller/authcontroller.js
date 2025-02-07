const User=require('../models/Usermodel')
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
const {generateToken}=require('../libs/Tokengenerator')
module.exports.signup=async(req,res)=>{
    try {
    const{name,email, password,role}=req.body

const duplicatedUser=await User.findOne({email})
if(duplicatedUser){

   return  res.status(400).json({error:"User already exsits"})
}


const hashedpassword=await bcrypt.hash(password,10)

   
   
    const newUser=new User({
        name,email, password:hashedpassword
        ,role,
    })
    const savedUser=await newUser.save();
    generateToken(savedUser._id,res)

    res.status(201).json({
        message:"Signup successfully",
        savedUser:{
            name:savedUser.name,
            email:savedUser.email,
            role:savedUser.role
        }
    })
    } 
    catch (error) {
     res.status(400).json({
        error:"Error in Signup to the page "
     }) 
    }
}

module.exports.login=async(req,res)=>{
    try {
        
     const {email,password}=req.body;

     const duplicatedUser=await User.findOne({email})

     if(!duplicatedUser){

   return res.status(400).json({error:"No user found"})
     }


     const hasedpassword=await bcrypt.compare(password,user.password)


      if(!hasedpassword){
            return res.status(400).json({message:'Invalid credentials'})
        }

        generateToken(duplicatedUser._id,res)

   return res.status(201).json({
    message:"login successfully",
    user:{
        name:duplicatedUser.name,
        email:duplicatedUser.email,
        role:duplicatedUser.role,

    }

   })


    } catch (error) {
  res.status(400).json({
    error:"Error in login to the page"
  })

        
    }
}

module.exports.logout=async(req,res)=>{
  try {
     res.cookie("Jobpostingapp",'',{maxAge:0})
       res.status(200).json({message:"Logged out successfully"})

  } catch (error) {
     res.status(500).json({
      message: 'An error occurred during logout. Please try again.',
      error: error.message,
    });
    
  }
}
module.exports.updateProfile=async(req,res)=>{
  try {
    const { ProfilePic } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    if (ProfilePic) {
      
      const uploadResponse = await cloudinary.uploader.upload(ProfilePic, {
        folder: "profile_inventory_system", 
        upload_preset: "upload", 
      });

      
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { ProfilePic: uploadResponse.secure_url },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
updateProfile
      return res.status(200).json({
        message: "Profile updated successfully",
        updatedUser,
      });
    } else {
      return res.status(400).json({ message: "No profile picture provided" });
    }
  } catch (error) {
    console.log("Error in update profile Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};