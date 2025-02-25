
const jwt=require('jsonwebtoken')
const User=require('../models/Usermodel')
require('dotenv').config();

module.exports.authmiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.Inventorymanagmentsystem;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

 
    const decodedToken = jwt.verify(token, process.env.SecretKey);

    

    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid token." });
    }

   
    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found." });
    }

    
    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token." });
  }
};

  module.exports.adminmiddleware=async(req,res,next)=>{
    const user=req.user
    try {
        if(!user){
            return res.status(403).json({ message: "Access denied." });
        }

        if(user.role!=="admin"){
            return res.status(403).json({ message: "Access denied. admin role required." });
        }
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token." });
    }
    
}



module.exports.managermiddleware=async(req,res,next)=>{
    const user=req.user
    try {
        if(!user){
            return res.status(403).json({ message: "Access denied." });
        }

        if(user.role!=="manager"){
            return res.status(403).json({ message: "Access denied. manager role required." });
        }
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token." });
    }
    
}



