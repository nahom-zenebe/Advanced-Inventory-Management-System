
const Order=require('../models/Ordermodel')






module.exports.createOrder=async()=>{
    try {

        const { user,Desciption, Product,price, totalAmount, status}=req.body

         if(!user||!Desciption|| !Product||!price|| !totalAmount||! status){
            return res.status(400).json({message:"please provide all neccesary information"})
         }

        let totalorderAmount=0

        Product.forEach((item)=>{
            totalorderAmount+=item.quantity *item.price


        })
         const newOrder=new Order({
            user,Desciption, Product,price, totalAmount:totalorderAmount, status,orderDate}
         )
         await newOrder.save()
         res.status(201).json(newOrder)
        
    } catch (error) {
        res.status(500).json({ message: "Error in creating order", error: error.message });


    }

}


module.exports.Removeorder=async(req,res)=>{
    try {
        const {OrdertId}=req.body
        const Deletedorder=await Order.findByIdAndDelete(OrdertId)
    
         if(!Deletedorder){
           return  res.status(404).json({message:"Order is not found!"})
         }
    
         res.status(200).json({message:"Order delete successfully"})
    
            
        } catch (error) {
            res.status(500).json({ message: "Error deleting Order", error: error.message });
        }


}

module.exports.getOrder=async(req,res)=>{
    try {
      
     const Orders=await Order.find({})
     if(!Orders){
        return res.status(404).json({message:"Orders is not found"})
     }

     res.status(200).json(Orders)

        
    } catch (error) {
        res.status(500).json({ message: "Error getting Orders", error: error.message });
    }
}

module.exports.updatestatusOrder=async(req,res)=>{
    try {
        const {status,OrderId}=req.body
        const updateorder=await Order.findByIdAndUpdate(OrderId,status,{new:true})

            if(!updateorder)
                {
                    return  res.status(400).json({message:"order is not found"})

                }
                
                res.status(200).json({message:"order successfully updated"})


    } catch (error) {
        res.status(500).json({ message: "Error in update status Orders", error: error.message });
    }

}
