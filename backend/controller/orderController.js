
const Order=require('../models/Ordermodel')






const createOrder=async()=>{
    try {

        const { user,Desciption, Product,price, totalAmount, status}=req.body
        const userId=req.user._id;
        const ipAddress=req.ip
        

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

         await logActivity({

            action:"Add Order",
             description:`Order  was created`,
             entity:"order",
             entityId:newOrder._id,
             userId:userId,
             ipAddress:ipAddress,
       
               })
         
         await newOrder.save()
         res.status(201).json(newOrder)
        
    } catch (error) {
        res.status(500).json({ message: "Error in creating order", error: error.message });


    }

}

const Removeorder = async (req, res) => {
    try {
        const { OrdertId } = req.params;
        const userId = req.user._id;
        const ipAddress = req.ip;
        const Deletedorder = await Order.findByIdAndDelete(OrdertId);

        if (!Deletedorder) {
            return res.status(404).json({ message: "Order is not found!" });
        }

        await logActivity({
            action: "Delete order",
            description: `Order was deleted.`,
            entity: "order",
            entityId: Deletedorder._id,
            userId: userId,
            ipAddress: ipAddress,
        });

        res.status(200).json({ message: "Order deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting Order", error: error.message });
    }
};


const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({});
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error getting orders", error: error.message });
    }
};

const updatestatusOrder=async(req,res)=>{
    try {
        const {OrderId}=req.params
        const {status}=req.body
        const userId=req.user._id;
        const ipAddress=req.ip
        const updateorder=await Order.findByIdAndUpdate(OrderId,status,{new:true})

            if(!updateorder)
                {
                    return  res.status(400).json({message:"order is not found"})

                }
                


        await logActivity({
          action: "Update Order",
          description: `Order  was updated.`,
          entity: "order",
          entityId: updateorder._id,
          userId: userId,
          ipAddress: ipAddress,
        });
                res.status(200).json({message:"order successfully updated"})


    } catch (error) {
        res.status(500).json({ message: "Error in update status Orders", error: error.message });
    }

}
const searchOrder = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }

        const searchdata = await Order.find({
            $or: [
                { Desciption: { $regex: query, $options: "i" } },
                { status: { $regex: query, $options: "i" } },
                { "user.name": { $regex: query, $options: "i" } }
            ]
        });

        res.json(searchdata);

    } catch (error) {
        res.status(500).json({ message: "Error in search Orders", error: error.message });
    }
};


module.exports = {
    createOrder,
    searchOrder,
    updatestatusOrder,
    getOrder,
    Removeorder
};